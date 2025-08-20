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
import { Newspaper } from 'lucide-react';

interface SponsorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SponsorDialog = ({ open, onOpenChange }: SponsorDialogProps) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/assets/NexHack-Sponsorship-Brochure.pdf';
        link.download = 'NexHack-Sponsorship-Brochure.pdf';
        link.click();
    };

    const handleSendMessage = async () => {
        if (!email || !message) {
            toast({
                title: 'Both email and message are required.',
                variant: 'destructive',
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const res = await fetch('https://websitebackend-w5m9.onrender.com/api/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, message }),
            });

            if (!res.ok) throw new Error('Something went wrong');

            toast({
                title: 'Message Sent ✅',
                description: "We'll reach out to you shortly!",
            });

            setEmail('');
            setMessage('');
            setName('');
            setCompany('');
            onOpenChange(false);
        } catch (err) {
            toast({
                title: 'Failed to send message',
                description: 'Please try again later or email us directly.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg minecraft-card bg-card/80 border-2 border-primary p-6 shadow-xl backdrop-blur-md">
                <DialogHeader>
                    <DialogTitle className="font-pixel text-2xl text-primary text-center">
                        BECOME A SPONSOR
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-center font-mono">
                        Join us to hack the next dimension!<br/> Download our sponsor brochure or drop us a message to collaborate.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handleDownload}
                        className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    >
                        <Newspaper />Download Brochure
                    </Button>
                    <Input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-muted font-mono"
                    />
                    <Input
                        type="email"
                        placeholder="youremail@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-muted font-mono"
                    />
                    <Input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-muted font-mono"
                    />

                    <Textarea
                        placeholder="Tell us how you'd like to sponsor, collaborate, or ask questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[100px] bg-muted font-mono"
                    />

                    <Button
                        onClick={handleSendMessage}
                        disabled={isSubmitting}
                        className="minecraft-btn bg-primary/60 text-white hover:bg-primary/30 w-full"
                    >
                        {isSubmitting ? 'Sending...' : ' Send Message'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
