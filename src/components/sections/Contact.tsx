'use client';

import { useState } from 'react';
import { AlertCircle, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, MessageCircle, Phone, RotateCcw } from 'lucide-react';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { useLocalTime } from '../../hooks/useLocalTime';
import { CONTACT_INFO } from '../../data/social';

const TOPICS = ['a new website', 'product & UI design', 'design + build', 'a full-time role', 'something else'] as const;

type Topic = (typeof TOPICS)[number];
type Field = 'name' | 'email' | 'topic' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const ERROR_TEXT: Record<Field, string> = {
    name: 'Add your name so I know who I am talking to.',
    email: 'Add a valid email address so I can reply.',
    topic: 'Pick what you would like to talk about.',
    message: 'Write at least a sentence about the idea (10+ characters).',
};

const formatPhone = (phone: string) => phone.replace(/^\+91(\d{5})(\d{5})$/, '+91 $1 $2');
// `ch` is the width of "0", wider than an average Geom letter, so scale it down to hug the text.
const fieldWidth = (value: string, placeholder: string) =>
    `${Math.max(value.length, placeholder.length) * 0.88 + 1}ch`;

const CHANNELS = [
    {
        label: 'WhatsApp',
        value: 'Quick chat',
        href: `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Dipesh, I saw your portfolio and would like to connect.')}`,
        icon: MessageCircle,
    },
    { label: 'Phone', value: formatPhone(CONTACT_INFO.phone), href: `tel:${CONTACT_INFO.phone}`, icon: Phone },
    { label: 'LinkedIn', value: 'in/dipesh-soni', href: CONTACT_INFO.linkedIn, icon: Linkedin },
    { label: 'GitHub', value: 'github.com/dini28', href: CONTACT_INFO.github, icon: Github },
] as const;

export default function Contact() {
    const localTime = useLocalTime('Asia/Kolkata');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState<Topic | null>(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
    const [status, setStatus] = useState<Status>('idle');
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(CONTACT_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const validate = () => {
        const next: Partial<Record<Field, boolean>> = {};
        if (name.trim().length < 2) next.name = true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true;
        if (!topic) next.topic = true;
        if (message.trim().length < 10) next.message = true;
        return next;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const found = validate();
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus('sending');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    subject: `Portfolio enquiry: ${topic}`,
                    message: message.trim(),
                    company: new FormData(e.currentTarget).get('company') ?? '',
                }),
            });
            const result = await response.json().catch(() => ({}));
            setStatus(response.ok && result.success ? 'sent' : 'error');
        } catch {
            setStatus('error');
        }
    };

    const reset = () => {
        setName('');
        setEmail('');
        setTopic(null);
        setMessage('');
        setErrors({});
        setStatus('idle');
    };

    const errorList = (Object.keys(errors) as Field[]).filter((key) => errors[key]);

    return (
        <Section
            id="contact"
            index="05"
            label="Contact"
            title={
                <>
                    Have an idea? <em>Let&apos;s build it.</em>
                </>
            }
            intro="Freelance projects, collaborations or a full-time role. Fill in the blanks below and I usually reply within 24 hours."
        >
            <div className="grid-12 gap-y-16">
                <Reveal className="col-span-4 md:col-span-7">
                    {status === 'sent' ? (
                        <div role="status" className="fade-swap surface p-8 md:p-10">
                            <span className="grid h-12 w-12 place-items-center rounded-[var(--r-btn)] bg-accent text-ink">
                                <Check className="h-5 w-5" />
                            </span>
                            <p className="t-h3 mt-8">
                                Message sent. <em className="text-accent">Talk soon.</em>
                            </p>
                            <p className="t-body mt-3 max-w-md">
                                Thanks, {name.trim().split(' ')[0]}. I&apos;ll reply to {email.trim()} within 24 hours.
                            </p>
                            <button type="button" onClick={reset} className="btn btn-ghost mt-8">
                                <RotateCcw className="h-4 w-4" />
                                Write another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate aria-describedby={errorList.length ? 'contact-errors' : undefined}>
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="absolute -left-[9999px] h-px w-px opacity-0"
                            />

                            <div className="text-[clamp(1.5rem,2.9vw,2.5rem)] font-medium leading-[1.75] tracking-[-0.035em] text-white/75">
                                <p>
                                    Hi Dipesh, my name is{' '}
                                    <label htmlFor="contact-name" className="sr-only">
                                        Your name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        aria-invalid={Boolean(errors.name)}
                                        className="blank"
                                        style={{ width: fieldWidth(name, 'your name') }}
                                    />{' '}
                                    and I&apos;d like to talk about
                                </p>

                                <div
                                    role="radiogroup"
                                    aria-label="What would you like to talk about?"
                                    aria-invalid={Boolean(errors.topic)}
                                    className="my-5 flex flex-wrap gap-2 text-base tracking-normal"
                                >
                                    {TOPICS.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            role="radio"
                                            aria-checked={topic === item}
                                            onClick={() => setTopic(item)}
                                            className={`choice ${errors.topic && !topic ? 'border-[#f2a07b]/60' : ''}`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <p>
                                    You can reach me at{' '}
                                    <label htmlFor="contact-email" className="sr-only">
                                        Your email
                                    </label>
                                    <span className="whitespace-nowrap">
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            inputMode="email"
                                            placeholder="you@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-invalid={Boolean(errors.email)}
                                            className="blank"
                                            style={{ width: fieldWidth(email, 'you@company.com') }}
                                        />
                                        .
                                    </span>
                                </p>
                            </div>

                            <label htmlFor="contact-message" className="t-label mt-10 block">
                                The idea, in a few lines
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={5}
                                placeholder="What are you building, who is it for, and when would you like to launch?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                aria-invalid={Boolean(errors.message)}
                                className={`mt-3 w-full resize-none rounded-[var(--r-md)] border bg-surface p-5 text-base leading-relaxed text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none ${
                                    errors.message ? 'border-[#f2a07b]' : 'border-white/10 hover:border-white/20'
                                }`}
                            />

                            {errorList.length > 0 && (
                                <ul id="contact-errors" role="alert" className="mt-5 space-y-1.5">
                                    {errorList.map((key) => (
                                        <li key={key} className="flex items-center gap-2 text-sm text-[#f2a07b]">
                                            <AlertCircle className="h-4 w-4 shrink-0" />
                                            {ERROR_TEXT[key]}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {status === 'error' && (
                                <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-[#f2a07b]">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    Sending failed. Please email me directly at {CONTACT_INFO.email}.
                                </p>
                            )}

                            <div className="mt-8 flex flex-wrap items-center gap-5">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === 'sending' ? 'Sending…' : 'Send message'}
                                    {status !== 'sending' && <ArrowRight className="h-4 w-4" />}
                                </button>
                                <span className="text-sm text-white/45">Your details are only used to reply to you.</span>
                            </div>
                        </form>
                    )}
                </Reveal>

                <Reveal className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9" delay={120}>
                    <aside className="space-y-8">
                        <div className="surface p-6">
                            <p className="t-label">Prefer email?</p>
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="mt-4 block break-all text-xl font-semibold tracking-[-0.03em] text-white transition-colors hover:text-accent"
                            >
                                {CONTACT_INFO.email}
                            </a>
                            <button
                                type="button"
                                onClick={copyEmail}
                                className={`mt-5 inline-flex h-9 cursor-pointer items-center gap-2 rounded-[var(--r-btn)] px-4 text-sm font-medium transition-colors ${
                                    copied ? 'bg-accent text-ink' : 'border hairline text-white/70 hover:text-white'
                                }`}
                                aria-label={`Copy email address ${CONTACT_INFO.email}`}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'Copied' : 'Copy address'}
                            </button>
                        </div>

                        <ul className="border-t hairline">
                            {CHANNELS.map(({ label, value, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center justify-between gap-4 border-b hairline py-4"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon className="h-4 w-4 text-white/50 transition-colors group-hover:text-accent" />
                                            <span className="text-sm text-white">{label}</span>
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-white/45">
                                            {value}
                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="flex items-center gap-2.5 text-white">
                                <span className="dot-live" />
                                Available for freelance
                            </span>
                            <span className="tabular-nums text-white/45">{localTime || '—'} IST</span>
                        </div>
                    </aside>
                </Reveal>
            </div>
        </Section>
    );
}
