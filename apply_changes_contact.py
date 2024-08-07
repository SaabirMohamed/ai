import os


def run_command(command):
    exit_code = os.system(command)
    if exit_code != 0:
        raise Exception(f"Command failed with exit code {exit_code}:{command}")


def create_or_update_file(file_path, content):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as f:
        f.write(content)
    print(f"Created/Updated: {file_path}")


# Update Header.tsx
header_content = """import NextLogo from "./NextLogo";
 import SupabaseLogo from "./SupabaseLogo";
 import Link from 'next/link';

 export default function Header() {
   return (
     <div className="flex flex-col gap-16 items-center">
       <div className="flex gap-8 justify-center items-center">
         <a
           href="https://supabase.com/?utm_source=create-next-app&utm_m
 ium=template&utm_term=nextjs"
           target="_blank"
           rel="noreferrer"
         >
           <SupabaseLogo />
         </a>
         <span className="border-l rotate-45 h-6" />
         <a href="https://nextjs.org/" target="_blank" rel="noreferrer"
           <NextLogo />
         </a>
       </div>
       <h1 className="sr-only">Supabase and Next.js Starter Template</h
       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-
 text-center">
         The fastest way to build apps with{" "}
         <a
           href="https://supabase.com/?utm_source=create-next-app&utm_m
 ium=template&utm_term=nextjs"
           target="_blank"
           className="font-bold hover:underline"
           rel="noreferrer"
         >
           Supabase
         </a>{" "}
         and{" "}
         <a
           href="https://nextjs.org/"
           target="_blank"
           className="font-bold hover:underline"
           rel="noreferrer"
         >
       </p>
         <Link href="/" className="hover:underline">
           Home
         </Link>
         <Link href="/contact" className="hover:underline">
           Contact
         </Link>
       </nav>
       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10
 to-transparent my-8" />
     </div>
   );
 }"""

# Create ContactForm.tsx
contact_form_content = """
 import { useState } from 'react';

 export default function ContactForm() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [pdfFile, setPdfFile] = useState<File | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     // Here you would typically send the form data to your backend
     console.log('Form submitted', { name, email, message, pdfFile });
     // Reset form after submission
     setName('');
     setEmail('');
     setMessage('');
     setPdfFile(null);
   };

   return (
     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <input
         type="text"
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder="Your Name"
         required
         className="p-2 border rounded"
       />
       <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Your Email"
         required
         className="p-2 border rounded"
       />
       <textarea
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         placeholder="Your Message"
         required
         className="p-2 border rounded h-32"
       />
       <div>
         <label htmlFor="pdfUpload" className="block mb-2">Upload PDF for Chat:</label>
         <input
           type="file"
           id="pdfUpload"
           accept=".pdf"
           onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
           className="p-2 border rounded w-full"
         />
       </div>
       <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
         Send Message
       </button>
     </form>
   );
 }"""

create_or_update_file("www/components/ContactForm.tsx", contact_form_content)

# Create contact/page.tsx
contact_page_content = """import ContactForm from '../../components/ContactForm';

 export default function ContactPage() {
   return (
     <div className="flex-1 w-full flex flex-col gap-20 items-center">
       <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
         <h1 className="text-4xl font-bold text-center">Contact Us</h1>
         <ContactForm />
       </div>
     </div>
   );
 }"""

create_or_update_file("www/app/contact/page.tsx", contact_page_content)
print("All changes have been applied successfully.")
