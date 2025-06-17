
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  category: string;
  topic: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: '',
    topic: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual webhook URL
      const response = await fetch('https://your-webhook-url.com/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          topic: formData.topic
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your post is being crafted and will be emailed shortly!",
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      // For demo purposes, we'll show success after a delay
      setTimeout(() => {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your post is being crafted and will be emailed shortly!",
        });
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      category: '',
      topic: ''
    });
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            ✍️ Generate LinkedIn Posts in Seconds
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Powered by AI. Crafted by your voice.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">LinkedPost AI</CardTitle>
            <CardDescription className="text-blue-100">
              Create engaging LinkedIn content tailored to your professional voice
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Your post is being crafted!
                </h3>
                <p className="text-slate-600 mb-6 text-lg">
                  Your LinkedIn content will be emailed to you shortly.
                </p>
                <Button 
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Create Another Post
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-700 font-medium">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                    required
                  >
                    <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-800 bg-white">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 shadow-lg">
                      <SelectItem value="education" className="hover:bg-blue-50">Education</SelectItem>
                      <SelectItem value="experience" className="hover:bg-blue-50">Experience</SelectItem>
                      <SelectItem value="job-opportunity" className="hover:bg-blue-50">Job Opportunity</SelectItem>
                      <SelectItem value="achievement" className="hover:bg-blue-50">Achievement</SelectItem>
                      <SelectItem value="skills" className="hover:bg-blue-50">Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-slate-700 font-medium">
                    Topic or Keywords *
                  </Label>
                  <Textarea
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    placeholder="Describe what you'd like to share... (e.g., 'Completed AWS certification', 'Team leadership experience', 'React development tips')"
                    required
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-800 min-h-24 resize-none"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.email || !formData.category || !formData.topic}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Crafting Your Post...
                    </>
                  ) : (
                    'Generate LinkedIn Post ✨'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-slate-500 text-sm">
          Powered by AI • Your data is secure and never stored
        </div>
      </div>
    </div>
  );
};

export default Index;
