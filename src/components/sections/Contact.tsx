import { useState } from 'react';
import { Mail, Linkedin, Phone, MapPin, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionBackground from '../common/SectionBackground';
import { CONTACT_INFO } from '../../data/social';

const Contact = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
    }>({});
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(CONTACT_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const validateForm = (formData: FormData) => {
        const errors: typeof formErrors = {};

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        if (!name || name.trim().length < 2) {
            errors.name = 'Please enter your full name (at least 2 characters)';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!subject || subject.trim().length < 3) {
            errors.subject = 'Please enter a subject (at least 3 characters)';
        }

        if (!message || message.trim().length < 10) {
            errors.message = 'Please enter a message (at least 10 characters)';
        }

        return errors;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const errors = validateForm(formData);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(false);

        try {
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitError(true);
            }
        } catch {
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof typeof formErrors) => {
        setFormErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <section ref={sectionRef} id="contact" className="py-20 bg-transparent relative overflow-hidden">
            {/* Background */}
            <SectionBackground variant="subtle" animated />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-400 font-medium mb-4 uppercase tracking-wider">Get in Touch</p>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                        Contact Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className={`lg:col-span-1 space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                                <div className="space-y-5">
                                    {/* Email */}
                                    <div className="group bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</span>
                                            </div>
                                            <button
                                                onClick={copyEmail}
                                                className={`p-1.5 rounded-lg border transition-all ${copied ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                                            >
                                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                        </div>
                                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-white font-medium hover:text-gray-300 transition-colors block px-7">
                                            {CONTACT_INFO.email}
                                        </a>
                                    </div>

                                    {/* Location */}
                                    <div className="group bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex items-center mb-2">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Location</span>
                                        </div>
                                        <p className="text-white font-medium px-7">{CONTACT_INFO.location}</p>
                                    </div>

                                    {/* Quick Contact */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:bg-white hover:text-black transition-all">
                                            <Phone className="w-4 h-4" /> Call Me
                                        </a>
                                        <a href={CONTACT_INFO.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:bg-white hover:text-black transition-all">
                                            <Linkedin className="w-4 h-4" /> LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    I typically respond within 24-48 hours. For urgent matters, please mark your email as "Urgent".
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Form */}
                    <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-300">
                            <CardContent className="p-8">
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                                Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.name ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all`}
                                                onChange={() => handleInputChange('name')}
                                                placeholder="John Doe"
                                            />
                                            {formErrors.name && (
                                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                                Email <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.email ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all`}
                                                onChange={() => handleInputChange('email')}
                                                placeholder="john@example.com"
                                            />
                                            {formErrors.email && (
                                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                                            Subject <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.subject ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all`}
                                            onChange={() => handleInputChange('subject')}
                                            placeholder="Project Inquiry"
                                        />
                                        {formErrors.subject && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {formErrors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                            Message <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.message ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all resize-none`}
                                            onChange={() => handleInputChange('message')}
                                            placeholder="Tell me about your project or idea..."
                                        />
                                        {formErrors.message && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {formErrors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Success/Error Messages */}
                                    {submitSuccess && (
                                        <div className="flex items-center p-4 bg-green-500/10 border-2 border-green-500/50 text-green-400 rounded-lg">
                                            <CheckCircle className="w-5 h-5 mr-2 shrink-0" />
                                            <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                                        </div>
                                    )}
                                    {submitError && (
                                        <div className="flex items-center p-4 bg-red-500/10 border-2 border-red-500/50 text-red-400 rounded-lg">
                                            <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                                            <span className="text-sm">Error submitting form. Please try again.</span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex justify-center pt-4">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="bg-white text-black hover:bg-gray-200 px-8 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="w-5 h-5 mr-2 inline group-hover:rotate-12 transition-transform" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA */}
                <div className={`text-center mt-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto hover:border-white/20 transition-all duration-300">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            Let's Work Together
                        </h3>
                        <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you have a project in mind, want to collaborate, or just want to say hello,
                            I'd love to hear from you. Let's create something amazing together!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;