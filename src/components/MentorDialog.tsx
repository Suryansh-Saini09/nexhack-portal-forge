import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

interface MentorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MentorDialog = ({ open, onOpenChange }: MentorDialogProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!name || !email || !linkedin || !experience || !github) {
      toast({
        title: 'All fields are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/mentor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, linkedin, github, experience }),
      });

      if (!res.ok) throw new Error('Something went wrong');

      toast({
        title: 'Application Submitted ✅',
        description: "Thanks for applying to be a mentor! We'll get back to you soon.",
      });

      setName('');
      setEmail('');
      setLinkedin('');
      setGithub('');
      setExperience('');
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Submission failed',
        description: 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg minecraft-card bg-card/80 border-2 border-green-600 p-6 shadow-xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="font-pixel text-2xl text-primary text-center flex items-center gap-5">
            <User /> BECOME A MENTOR
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center font-mono">
            Guide the next generation of adventurers at NexHack. Share your experience & help shape innovation!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-muted font-mono"
          />

          <Input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted font-mono"
          />

          <Input
            placeholder="LinkedIn Profile *"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="bg-muted font-mono"
          />

          <Input
            placeholder="GitHub Profile *"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="bg-muted font-mono"
          />

          <Textarea
            placeholder="Describe your mentorship experience or how you'd like to contribute *"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="min-h-[100px] bg-muted font-mono"
          />

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="minecraft-btn bg-primary/60 text-white hover:bg-primary/30 w-full"
          >
            {isSubmitting ? 'Submitting...' : ' Submit Application'}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};
