import ContactForm from '../../components/ContactForm';

 export default function ContactPage() {
   return (
     <div className="flex-1 w-full flex flex-col gap-20 items-center">
       <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
         <h1 className="text-4xl font-bold text-center">Contact Us</h1>
         <ContactForm />
       </div>
     </div>
   );
 }