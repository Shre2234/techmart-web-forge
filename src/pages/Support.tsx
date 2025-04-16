
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

const Support = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Support request received",
      description: "We'll get back to you within 24 hours.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-techmart-purple text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get support for your TECHMART products and services
            </p>
          </div>
        </div>
        
        {/* Contact Options */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-techmart-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Talk to our support team in real-time</p>
              <Button className="bg-techmart-purple hover:bg-techmart-purple/90">
                Start Chat
              </Button>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" /> Available 24/7
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-techmart-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with a support representative</p>
              <Button className="bg-techmart-purple hover:bg-techmart-purple/90">
                1-800-TECH-MART
              </Button>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" /> 9AM - 9PM EST
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-techmart-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
              <Button className="bg-techmart-purple hover:bg-techmart-purple/90">
                support@techmart.com
              </Button>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" /> Response within 24 hours
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Get in Touch</h2>
            
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="mt-6 space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your issue in detail"
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <Button className="mt-6 w-full bg-techmart-purple hover:bg-techmart-purple/90" type="submit">
                  Submit Support Request
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our products, services, and policies.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and delivers within 1-2 business days. International shipping may take 7-14 business days depending on the destination country.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most products. Items must be in their original condition and packaging. Some products like earphones and certain software items may have different return policies. Please check the product page for specific details.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer price matching?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer price matching for identical products sold by major retailers. To request a price match, please contact our customer service team with evidence of the competitor's current price.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history. Please allow 24-48 hours for tracking information to update after receiving your shipping confirmation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer technical support for products?</AccordionTrigger>
                <AccordionContent>
                  Yes, we provide technical support for all products purchased from TECHMART. You can contact our tech support team via phone, email, or live chat. For warranty service, please have your order number and product details ready.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
              <Button className="bg-techmart-purple hover:bg-techmart-purple/90">
                <HelpCircle className="mr-2 h-4 w-4" />
                View All FAQs
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
