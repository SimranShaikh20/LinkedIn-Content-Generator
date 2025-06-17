import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  category: string;
  topic: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    topic: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
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
    setGeneratedPost('');

    try {
      const response = await fetch('https://simranshaikh20.app.n8n.cloud/webhook-test/brandme-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          topic: formData.topic
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Extract the generated post from the response
        const postText = data.generated_post || data.message || data;
        setGeneratedPost(postText);
        toast({
          title: "Success!",
          description: "Your LinkedIn post has been generated!",
        });
      } else {
        throw new Error('Failed to generate post');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an issue generating your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Post copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      topic: ''
    });
    setGeneratedPost('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setFeedbackSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
    } else {
      toast({
        title: "Please provide a rating",
        description: "Please rate your experience before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            ✍️ Generate LinkedIn Posts in Seconds
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Powered by AI. Crafted by your voice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">LinkedPost AI</CardTitle>
              <CardDescription className="text-blue-100">
                Create engaging LinkedIn content tailored to your professional voice
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={isLoading || !formData.name || !formData.category || !formData.topic}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Your Post...
                    </>
                  ) : (
                    'Generate LinkedIn Post ✨'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Generated Post Section */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Generated LinkedIn Post
              </CardTitle>
              <CardDescription className="text-green-100">
                Your AI-crafted professional content is ready!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {generatedPost ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 min-h-[300px]">
                    <div className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed select-text">
                      {generatedPost}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Post
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Create Another Post
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Ready to Generate
                  </h3>
                  <p className="text-slate-500">
                    Fill out the form and click generate to see your LinkedIn post here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Feedback Section */}
        <Card className="mt-8 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">
              {formData.name ? `Share Your Experience, ${formData.name}!` : 'Share Your Experience'}
            </CardTitle>
            <CardDescription className="text-purple-100">
              Help us improve LinkedPost AI with your feedback
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            {!feedbackSubmitted ? (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Rate your experience *</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 rounded hover:scale-110 transition-transform ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback" className="text-slate-700 font-medium">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you loved or how we can improve..."
                    className="border-slate-300 focus:border-purple-500 focus:ring-purple-500 text-slate-800 min-h-20 resize-none"
                    rows={3}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-6"
                >
                  Submit Feedback
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  {formData.name ? `Thank you for your feedback, ${formData.name}!` : 'Thank you for your feedback!'}
                </h3>
                <p className="text-slate-500">
                  Your input helps us make LinkedPost AI better for everyone.
                </p>
              </div>
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
