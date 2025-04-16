
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, CreditCard, Package, AlertOctagon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  detectFraud, 
  TransactionData, 
  FraudDetectionResponse, 
  getUserIpAddress, 
  getDeviceInfo 
} from '@/services/aiService';

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const [transactionAmount, setTransactionAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [fraudAnalysisResult, setFraudAnalysisResult] = useState<FraudDetectionResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!isLoading && user && !isAdmin()) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access this page",
      });
    }
  }, [user, isAdmin, isLoading]);

  const handleFraudDetection = async () => {
    if (!transactionAmount || isNaN(parseFloat(transactionAmount))) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid transaction amount",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const ipAddress = await getUserIpAddress();
      const deviceInfo = getDeviceInfo();
      
      const transactionData: TransactionData = {
        amount: parseFloat(transactionAmount),
        payment_method: paymentMethod,
        ip_address: ipAddress || undefined,
        device_info: deviceInfo,
        products: [
          {
            id: "sample-product-1",
            name: "Sample Product",
            price: parseFloat(transactionAmount) * 0.8,
            quantity: 1
          }
        ],
        shipping_address: {
          country: "US",
          city: "New York",
          postal_code: "10001"
        },
        billing_address: {
          country: paymentMethod === 'suspicious' ? "RU" : "US",
          city: paymentMethod === 'suspicious' ? "Moscow" : "New York",
          postal_code: paymentMethod === 'suspicious' ? "101000" : "10001"
        }
      };
      
      const result = await detectFraud(transactionData);
      setFraudAnalysisResult(result);
      
      if (result.is_fraudulent) {
        toast({
          variant: "destructive",
          title: "Potential Fraud Detected!",
          description: `Risk score: ${result.risk_score}/100`,
        });
      } else {
        toast({
          title: "Transaction Appears Legitimate",
          description: `Risk score: ${result.risk_score}/100`,
        });
      }
    } catch (error) {
      console.error('Error in fraud detection:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not complete fraud analysis",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Redirect if not logged in or not an admin
  if (!user || !isAdmin()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹145,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+29 new products</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+180 new users</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Fraud Detection Tool */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <AlertOctagon className="h-5 w-5 mr-2 text-red-500" />
                AI Fraud Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transaction-amount">Transaction Amount ($)</Label>
                  <Input
                    id="transaction-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <select 
                    id="payment-method"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="gift_card">Gift Card</option>
                    <option value="suspicious">Suspicious (Test)</option>
                  </select>
                </div>
                
                <Button 
                  onClick={handleFraudDetection} 
                  className="w-full" 
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Transaction"}
                </Button>
                
                {fraudAnalysisResult && (
                  <div className={`mt-4 p-4 rounded-md border ${
                    fraudAnalysisResult.is_fraudulent 
                      ? "border-red-400 bg-red-50" 
                      : "border-green-400 bg-green-50"
                  }`}>
                    <h3 className={`font-bold ${
                      fraudAnalysisResult.is_fraudulent ? "text-red-600" : "text-green-600"
                    }`}>
                      {fraudAnalysisResult.is_fraudulent 
                        ? "⚠️ Potential Fraud Detected" 
                        : "✅ Transaction Appears Legitimate"}
                    </h3>
                    <p className="mb-2">Risk Score: <strong>{fraudAnalysisResult.risk_score}/100</strong></p>
                    
                    {fraudAnalysisResult.risk_factors.length > 0 && (
                      <>
                        <p className="font-medium">Risk Factors:</p>
                        <ul className="list-disc list-inside text-sm">
                          {fraudAnalysisResult.risk_factors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No product sales data to display.</p>
              {/* You can add a chart here for real data */}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
