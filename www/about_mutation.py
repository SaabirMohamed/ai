import os
import subprocess


def run_command(command):
    process = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )
    output, error = process.communicate()
    if process.returncode != 0:
        print(f"Error executing command: {command}")
        print(error.decode("utf-8"))
        exit(1)
    return output.decode("utf-8")


def create_or_update_file(file_path, content):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as f:
        f.write(content)


# Create and switch to the "about" branch
run_command("git checkout -b about")

# Update www/app/page.tsx
home_page_content = """
  import AuthButton from "../components/AuthButton";
  import { createClient } from "@/utils/supabase/server";
  import Link from 'next/link';

  export default async function Index() {
    const supabase = createClient();

    const {
     data: { user },
    } = await supabase.auth.getUser();

    return (
     <div className="flex-1 w-full flex flex-col gap-20 items-center">
       <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
         <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
           <AuthButton />
           <Link href="/about" className="hover:underline">
             About
           </Link>
         </div>
       </nav>

       <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
         <main className="flex-1 flex flex-col gap-6">
           <h1 className="text-3xl font-bold">Welcome to Our Ride-Hailing API</h1>
           {user ? (
             <p>You are logged in as {user.email}</p>
           ) : (
             <p>Please log in or sign up to access our API services</p>
           )}
         </main>
       </div>
     </div>
   );
 }
 """

create_or_update_file("www/app/page.tsx", home_page_content)

# Create www/app/about/page.tsx
about_page_content = """
 import Link from 'next/link';

 export default function About() {
   return (
     <div className="flex-1 w-full flex flex-col gap-20 items-center">
       <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
         <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
           <Link href="/" className="hover:underline">
             Home
           </Link>
         </div>
       </nav>

       <main className="flex-1 flex flex-col gap-6 max-w-4xl px-3">
         <h1 className="text-3xl font-bold">About Our Ride-Hailing API</h1>

         <section>
           <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
           <p>We are a leading provider of ride-hailing API solutions, connecting skilled drivers with innovative app creators and companies.</p>
         </section>

         <section>
           <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
           <p>Our mission is to empower businesses with a reliable, scalable, and efficient driver network, enabling them to focus on creating
 exceptional ride-hailing experiences for their users.</p>
         </section>

         <section>
           <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
           <ul className="list-disc pl-5">
             <li>Access to a vast network of verified, professional drivers</li>
             <li>Real-time driver availability and location tracking</li>
             <li>Seamless integration with your existing platforms</li>
             <li>Customizable pricing models to suit your business needs</li>
             <li>Comprehensive driver management tools</li>
             <li>24/7 support for both technical and operational queries</li>
           </ul>
         </section>

         <section>
           <h2 className="text-2xl font-semibold mb-2">Why Choose Us</h2>
           <p>By leveraging our API, you can rapidly scale your ride-hailing service without the overhead of recruiting and managing drivers. Our
 solution allows you to focus on your core business while we handle the complexities of driver logistics.</p>
         </section>

         <section>
           <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
           <p>Ready to revolutionize your ride-hailing service? Contact our sales team to learn more about integrating our API into your
 platform.</p>
           <Link href="/contact" className="inline-block mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
             Contact Us
           </Link>
         </section>
       </main>
     </div>
   );
 }
 """

create_or_update_file("www/app/about/page.tsx", about_page_content)

# Commit the changes
run_command("git add .")
run_command('git commit -m "Add About page for ride-hailing API and update home page"')

print("Changes have been applied successfully!")
print(
    "You are now on the 'about' branch with the new About page and updated home page."
)
print("Remember to push your changes to the remote repository if needed.")
