const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// In-memory databases (replace with real database in production)
const users = [];
const loans = [];
const documents = [];
const creditScores = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'sahayloan_secret_key';

// AI Underwriting Service Mock
class AIUnderwritingService {
  static async processApplication(applicationData) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { personalInfo, documents: docs, loanDetails } = applicationData;
    let score = 70; // Base score
    
    // Score based on income
    if (personalInfo.monthlyIncome >= 50000) score += 20;
    else if (personalInfo.monthlyIncome >= 30000) score += 15;
    else if (personalInfo.monthlyIncome >= 20000) score += 10;
    
    // Score based on documents
    if (docs.length >= 3) score += 10;
    
    // Score based on loan amount vs income ratio
    const loanToIncomeRatio = loanDetails.amount / (personalInfo.monthlyIncome * 12);
    if (loanToIncomeRatio < 0.3) score += 10;
    else if (loanToIncomeRatio > 0.5) score -= 10;
    
    // Determine approval
    const approved = score >= 75;
    const riskCategory = score >= 85 ? 'low' : score >= 75 ? 'medium' : 'high';
    
    return {
      approved,
      score: Math.min(100, Math.max(0, score)),
      riskCategory,
      interestRate: approved ? (riskCategory === 'low' ? 10.5 : 12.5) : null,
      reasons: approved ? 
        ['Good income stability', 'Complete documentation', 'Favorable loan-to-income ratio'] :
        ['Income insufficient', 'High risk profile', 'Incomplete documentation']
    };
  }
  
  static async extractDocumentData(file) {
    // Simulate OCR + AI extraction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = {
      'aadhar': {
        name: 'राम कुमार शर्मा',
        number: '1234 5678 9012',
        address: 'गांव पोस्ट - रामपुर, जिला - मेरठ, उत्तर प्रदेश - 250001',
        dob: '15/08/1985',
        confidence: Math.floor(Math.random() * 20) + 80
      },
      'pan': {
        name: 'RAM KUMAR SHARMA',
        number: 'ABCDE1234F',
        dob: '15/08/1985',
        confidence: Math.floor(Math.random() * 20) + 85
      },
      'bank': {
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
        balance: Math.floor(Math.random() * 50000) + 25000,
        avgBalance: Math.floor(Math.random() * 40000) + 20000,
        confidence: Math.floor(Math.random() * 15) + 85
      }
    };
    
    // Determine document type based on filename or random selection
    const docType = file.originalname.toLowerCase().includes('aadhar') ? 'aadhar' :
                   file.originalname.toLowerCase().includes('pan') ? 'pan' : 'bank';
    
    return {
      type: docType,
      data: mockData[docType],
      status: Math.random() > 0.1 ? 'verified' : 'needs_review'
    };
  }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// User Registration/Login
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.phone === phone);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: uuidv4(),
      name,
      phone,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ userId: user.id, phone: user.phone }, JWT_SECRET);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, phone: user.phone, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // Find user
    const user = users.find(u => u.phone === phone);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id, phone: user.phone }, JWT_SECRET);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, phone: user.phone, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Document Upload and Processing
app.post('/api/documents/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Process with AI
    const extractedData = await AIUnderwritingService.extractDocumentData(req.file);
    
    // Save document metadata
    const document = {
      id: uuidv4(),
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      extractedData,
      uploadedAt: new Date().toISOString()
    };
    
    documents.push(document);
    
    res.json({
      message: 'Document processed successfully',
      document
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Document processing failed' });
  }
});

// Loan Application Submission
app.post('/api/loans/apply', authenticateToken, async (req, res) => {
  try {
    const { personalInfo, documents: docIds, loanDetails } = req.body;
    
    // Get user documents
    const userDocuments = documents.filter(doc => docIds.includes(doc.id));
    
    // Create application
    const application = {
      id: uuidv4(),
      userId: req.user.userId,
      personalInfo,
      documents: userDocuments,
      loanDetails,
      status: 'processing',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    loans.push(application);
    
    // Process with AI (async)
    setTimeout(async () => {
      try {
        const aiResult = await AIUnderwritingService.processApplication(application);
        
        // Update application
        const loanIndex = loans.findIndex(l => l.id === application.id);
        if (loanIndex !== -1) {
          loans[loanIndex].aiResult = aiResult;
          loans[loanIndex].status = aiResult.approved ? 'approved' : 'rejected';
          loans[loanIndex].updatedAt = new Date().toISOString();
          
          if (aiResult.approved) {
            loans[loanIndex].approvedAmount = loanDetails.amount;
            loans[loanIndex].interestRate = aiResult.interestRate;
          }
        }
        
        // Store credit score
        creditScores.push({
          userId: req.user.userId,
          score: aiResult.score,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('AI processing error:', error);
      }
    }, 0);
    
    res.status(201).json({
      message: 'Loan application submitted successfully',
      applicationId: application.id,
      status: application.status
    });
  } catch (error) {
    console.error('Loan application error:', error);
    res.status(500).json({ error: 'Loan application failed' });
  }
});

// Get Loan Status
app.get('/api/loans/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const loan = loans.find(l => l.id === id);
    
    if (!loan) {
      return res.status(404).json({ error: 'Loan application not found' });
    }
    
    res.json({
      id: loan.id,
      status: loan.status,
      submittedAt: loan.submittedAt,
      updatedAt: loan.updatedAt,
      loanDetails: loan.loanDetails,
      aiResult: loan.aiResult,
      approvedAmount: loan.approvedAmount,
      interestRate: loan.interestRate
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loan status' });
  }
});

// Get User's Loan Applications
app.get('/api/loans', authenticateToken, (req, res) => {
  try {
    const userLoans = loans
      .filter(l => l.userId === req.user.userId)
      .map(l => ({
        id: l.id,
        status: l.status,
        loanDetails: l.loanDetails,
        submittedAt: l.submittedAt,
        updatedAt: l.updatedAt,
        approvedAmount: l.approvedAmount,
        interestRate: l.interestRate
      }))
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    res.json({ loans: userLoans });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

// Get Credit Score
app.get('/api/credit-score', authenticateToken, (req, res) => {
  try {
    const userScores = creditScores
      .filter(s => s.userId === req.user.userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const latestScore = userScores[0]?.score || 0;
    
    res.json({
      currentScore: latestScore,
      history: userScores.slice(0, 10) // Last 10 scores
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch credit score' });
  }
});

// Chat/Conversational Assistant
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;
    
    // Simple rule-based responses (replace with actual AI in production)
    const responses = {
      'emi': 'आपकी EMI लोन अमाउंट और टेन्योर के हिसाब से तय होती है। 50,000 रुपये के लिए 12 महीने में लगभग 4,500 रुपये मासिक EMI होगी।',
      'documents': 'आपको चाहिए होगा: आधार कार्ड, पैन कार्ड, बैंक स्टेटमेंट (3 महीने का), और सैलरी स्लिप या इनकम प्रूफ।',
      'time': 'AI तकनीक की मदद से आपका लोन सिर्फ 2 मिनट में अप्रूव हो जाता है! पैसा भी तुरंत आपके खाते में आ जाता है।',
      'interest': 'हमारी ब्याज दरें बहुत कम हैं - सिर्फ 10.5% से शुरू! आपकी क्रेडिट हिस्ट्री के आधार पर और भी कम हो सकती है।'
    };
    
    const lowercaseMessage = message.toLowerCase();
    let response = 'मैं समझ नहीं पाया। क्या आप फिर से पूछ सकते हैं?';
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key) || 
          (key === 'emi' && lowercaseMessage.includes('किश्त')) ||
          (key === 'documents' && lowercaseMessage.includes('कागज')) ||
          (key === 'time' && (lowercaseMessage.includes('कब') || lowercaseMessage.includes('समय'))) ||
          (key === 'interest' && lowercaseMessage.includes('ब्याज'))) {
        response = value;
        break;
      }
    }
    
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Chat service failed' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SahayLoan Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💼 Total Users: ${users.length}`);
  console.log(`📄 Total Loans: ${loans.length}`);
});