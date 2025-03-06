import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
  } from "./terminal";
  
  export function TerminalDemo() {
    return (
      <Terminal>
        <TypingAnimation>&gt; Talafoz.com explore-specialized-career-paths</TypingAnimation>
  
        <AnimatedSpan delay={1500} className="text-emerald-500 font-medium">
          <span>✓ Frontend Development Path</span>
        </AnimatedSpan>
  
        <AnimatedSpan delay={2000} className="text-sky-400">
          <span className="pl-4">→ HTML5, CSS3, JavaScript ES6+</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2200} className="text-sky-400">
          <span className="pl-4">→ React, Vue.js, Angular Frameworks</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2400} className="text-sky-400">
          <span className="pl-4">→ Responsive Design & UI/UX Principles</span>
        </AnimatedSpan>
  
        <AnimatedSpan delay={2800} className="text-emerald-500 font-medium">
          <span>✓ Backend Development Path</span>
        </AnimatedSpan>
  
        <AnimatedSpan delay={3300} className="text-sky-400">
          <span className="pl-4">→ Php, Node.js, Python, Java or C#</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3500} className="text-sky-400">
          <span className="pl-4">→ RESTful APIs & GraphQL</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3700} className="text-sky-400">
          <span className="pl-4">→ Database Design & Management</span>
        </AnimatedSpan>
  
        <AnimatedSpan delay={4100} className="text-emerald-500 font-medium">
          <span>✓ DevOps Engineering Path</span>
        </AnimatedSpan>
  
        <AnimatedSpan delay={4600} className="text-sky-400">
          <span className="pl-4">→ CI/CD Pipelines</span>
        </AnimatedSpan>
        <AnimatedSpan delay={4800} className="text-sky-400">
          <span className="pl-4">→ Docker, Kubernetes, Cloud Platforms</span>
        </AnimatedSpan>
        <AnimatedSpan delay={5000} className="text-sky-400">
          <span className="pl-4">→ Infrastructure as Code & Monitoring</span>
        </AnimatedSpan>
  

  
        <TypingAnimation delay={8200} className="text-amber-400 font-medium pt-2">
          Choose your specialized career path or combine multiple skills!
        </TypingAnimation>
  
        <TypingAnimation delay={9000} className="text-gray-300 pt-1">
          Talafoz.com — Your fast track to tech career success.
        </TypingAnimation>
      </Terminal>
    );
  }
  