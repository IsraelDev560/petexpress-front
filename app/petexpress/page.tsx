import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GettingStarted() {
  return (
    <div className="min-h-screen text-black dark:text-white p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white">🚀 Getting Started with PetExpress</h1>
          <p className="dark:text-gray-400 text-black mt-2">
            Learn how to manage users, animals, and tasks with ease.
          </p>
        </header>

        <section className="bg-gray-900/70 p-6 rounded-xl shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">👥 User Roles</h2>
          <p className="text-gray-300">
            PetExpress has two roles:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-100 dark:text-gray-300 text-sm">
            <li><strong>ADMIN</strong> – Full access to manage users, animals, tasks, and task-types.</li>
            <li><strong>USER</strong> – Can view, manage tasks, animals, and task types.</li>
          </ul>
          <p className="text-sm text-yellow-400 mt-2">
            ⚠️ Only ADMINs can create new users or change roles.
          </p>
        </section>

        <section className="bg-gray-900/70 p-6 rounded-xl shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">🐾 Animal Registration</h2>
          <p className="text-gray-300">
            To register an animal, you only need the name and species. These will be linked to future tasks.
          </p>
        </section>

        <section className="bg-gray-900/70 p-6 rounded-xl shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">📋 Task Management</h2>
          <p className="text-gray-300">
            Tasks represent actions to be performed with animals, such as vaccinations or checkups.
            Each task is linked to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm text-gray-300">
            <li><strong>A Task Type</strong> – This defines the nature of the task (e.g. "Vaccine", "Grooming"). You must create it first.</li>
            <li><strong>An Animal</strong> – The pet the task will be assigned to.</li>
          </ul>
          <p className="mt-2 text-gray-300">
            So before creating a task, make sure you have already created the necessary task type in the system.
          </p>
        </section>

        <section className="bg-gray-900/70 p-6 rounded-xl shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">🔒 Security</h2>
          <p className="text-gray-300">
            All access is protected with JWT-based authentication. Sessions are safe, and only authorized users can perform actions.
          </p>
        </section>

        <section className="bg-gray-900/70 p-6 rounded-xl shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">📚 Dubouts</h2>

          <Accordion type="multiple" className="space-y-2 text-gray-100 dark:text-gray-300">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Can a USER create or delete other users?</AccordionTrigger>
              <AccordionContent>
                No. Only ADMINs have permission to manage user accounts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger>Can I edit an animal after it's registered?</AccordionTrigger>
              <AccordionContent>
                Yes. You can update an animal's info anytime by accessing the animal table.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger>Are task types customizable?</AccordionTrigger>
              <AccordionContent>
                Yes. You can define and manage your own task types in the system settings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4">
              <AccordionTrigger>What happens if I delete an animal?</AccordionTrigger>
              <AccordionContent>
                All tasks linked to that animal will also be removed. Be careful!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  )
}
