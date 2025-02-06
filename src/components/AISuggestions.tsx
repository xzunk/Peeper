import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AISuggestionsProps {
  peRatio: number;
  pbRatio: number;
  marketPrice: number;
}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<string>;
      };
    };
  }
}

const AISuggestions = ({ peRatio, pbRatio, marketPrice }: AISuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getSuggestions = async () => {
      if (!peRatio || !pbRatio || !marketPrice) return;
      
      setLoading(true);
      try {
        // Check if Puter.js is properly initialized
        if (!window.puter || !window.puter.ai) {
          console.error('Puter.js not initialized');
          throw new Error('AI service not available');
        }

        const prompt = `As a financial advisor, analyze these stock metrics and provide brief investment advice:
          PE Ratio: ${peRatio}
          PB Ratio: ${pbRatio}
          Market Price: ${marketPrice}
          Keep the response concise and focus on the key insights.`;

        const response = await window.puter.ai.chat(prompt);
        setSuggestions(response);
      } catch (error) {
        console.error('Error getting AI suggestions:', error);
        toast({
          title: "Error",
          description: "Unable to generate AI suggestions at this time. Please try again later.",
          variant: "destructive",
        });
        setSuggestions('Unable to generate suggestions at this time.');
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, [peRatio, pbRatio, marketPrice, toast]);

  if (!peRatio || !pbRatio || !marketPrice) return null;

  return (
    <Card className="p-4 mt-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Insights</h3>
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <p className="text-sm text-gray-600">{suggestions}</p>
      )}
    </Card>
  );
};

export default AISuggestions;