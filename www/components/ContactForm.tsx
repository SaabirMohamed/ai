
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
 }