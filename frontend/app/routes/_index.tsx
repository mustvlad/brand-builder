import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { Switch } from '@headlessui/react';
import React from "react";

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ')
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userInput = Object.fromEntries(formData);

  try {
    const apiUrl = "http://localhost:8888/brands";
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
      redirect: 'follow'
    });

    const brandEntry = await res.json();

    if (!brandEntry) {
      throw new Error("Could not create brand entry");
    }

    return redirect(`/brands/${brandEntry._id}`);
  } catch (error) {
    console.log("error", error);
    return json({ ok: false, error });
  }
}

export default function Index() {
  const navigation = useNavigation();
  const [agreed, setAgreed] = React.useState(false);

  return (
    <div>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div className="animate-[spin_20s_linear_infinite] relative left-0 -z-10 aspect-[1155/2155] w-[24rem] max-w-none bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-70 sm:aspect-[1155/678] sm:left-[calc(50%-40rem)] sm:w-[80rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      
      <div className="mx-auto max-w-2xl text-center mb-24 pt-24 sm:pt-32 px-5 sm:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Brand Builder</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Pasiune, Poveste, Succes!
        </p>
      </div>
      
      <div className="mx-auto max-w-xl pb-24 sm:pb-32 px-5 sm:px-0">
        <Form method="post">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nume si prenume
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adresa email
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="email"
                      name="email"
                      autoComplete="email"
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Hard Skills
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Competentele tale tehnice.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="studies"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Studii universitare / postuniversitare
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="studies"
                      name="studies"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "UMF Carol Davila - Nutriție și Dietetică"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: UMF Carol Davila - Nutriție și Dietetică sau University of Oxford - BSc in Human Nutrition
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Specializare
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="specialization"
                      name="specialization"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={"nutriționist - dietetician"}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: nutriționist-dietetician
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="expertise"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Expertiză profesională
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="expertise"
                      name="expertise"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "15 ani de experiență și peste 2000 de pacienți tratați"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: 15 ani de experiență clinică, peste 2000 de pacienți tratați, fondator al clinicii X
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="overspecialization"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Supraspecializare / Arii principale de interes
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="overspecialization"
                      name="overspecialization"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "tratamentul obezității și a sindromului metabolic"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: tratamentul obezității și a sindromului metabolic; nutriție oncologică; nutriție pediatrică
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="certifications"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Acreditări / Certificări / Premii / Distincții
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="certifications"
                      name="certifications"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Certificarea Internațională în Managementul Obezității (IBOC): IBOC oferă certificarea specialiștilor în domeniul obezității, inclusiv nutriționiștilor dieteticieni. Această acreditare indică aptitudini și cunoștințe avansate în gestionarea complexă a problemelor legate de greutate și metabolism, consolidând reputația profesională în tratamentul obezității și a sindromului metabolic."
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: Certificarea Internațională în Managementul Obezității (IBOC)
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Abilitati
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Abilitatile pe care le ai dezvoltat de-a lungul timpului.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="teachingSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Abilități didactice
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="teachingSkills"
                      name="teachingSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Profesor universitar la UMF Cluj, Departamentul de Medicină Comunitară"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: Profesor universitar; lector univ; trainer
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="tehnologicalSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Abilități tehnologice
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="tehnologicalSkills"
                      name="tehnologicalSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Fondator al aplicației MyWeightTrack care are peste 100.000 de user activi/lună"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: fondator al unei aplicații de nutriție; susține cursuri online; consultații prin telemedicină
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="researchSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Abilități de cercetător
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="researchSkills"
                      name="researchSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={`Autoarea tezei de doctorat "Integrarea Inteligenței Artificiale în Identificarea Factorilor de Risc și Intervenții pentru Combaterea Obezității și Sindromului Metabolic"`}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: titluri de lucrări științifice publicate
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="publicSpeakingSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Abilități de public speaking
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="publicSpeakingSkills"
                      name="publicSpeakingSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Ted speaker (Romania, 2022): ted talk-ul a fost despre descoperirile mele din domeniul nutriției și sănătății si succesul aplicatia pe care am lansat-o"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: speaker la conferințe; invitat în podcasturi; live-uri pe social media
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="mentorSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Abilități de mentor / trainer / coach
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="mentorSkills"
                      name="mentorSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: nume de cursuri pe care le susții de formare profesională/ cursuri pentru publicul larg etc
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="leadershipSkills"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Lider în industrie
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="leadershipSkills"
                      name="leadershipSkills"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Președintă a Asociației pentru sprijinirea pacienților cu obezitate (2018 - prezent)"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: membru fondator al unei asociații, comunitate mare în online, președinte al unei societăți etc
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Soft skills
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Abilitatile tale de comunicare si relationare.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="communityInvolvement"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Implicare în societate
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="communityInvolvement"
                      name="communityInvolvement"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={`Unul dintre inițiatorii programului național de fitness comunitar "Miscă-te pentru sănătate" - o campanie de Strângere de Fonduri care își propune să doteze câte un parc din fiecare oraș din țară cu aparate gratuite de fitnesss; crearea de spații de antrenament accesibile și programe de exerciții pentru toți membrii comunității.`}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: 2-3 exemple de campanii de CSR, fundraising, charity în nutriție în care te-ai implicat
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="characterTraits"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Trasături de caracter
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="characterTraits"
                      name="characterTraits"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Curajoasa; Conectata la problemele nutriționale din comunitate"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: 2-3 adjective prin care te descriu pacienții/ colegii de breaslă, ex: curajos, ambițios etc
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="patientInteractionStyle"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stil de interacțiune cu pacienții
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="patientInteractionStyle"
                      name="patientInteractionStyle"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Foarte aplicat și pus pe acțiune; disponibil pe whatsapp / email oricând e nevoie"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: Empatic și înțelegător.​ Adaptabil la diferite tipuri de pacienți?​
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="addedValue"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ce valoare vrei să aduci în viețile oamenilor?
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="addedValue"
                      name="addedValue"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Gestionarea sănătoasă a greutății; susținere psihologică pentru pacienții care se confruntă cu tulburări de alimentație precum mânncatul compulsiv; Controlul bolilor metabolice cum ar fi diabetul sau sindromul metabolic"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: Gestionarea sănătoasă a greutății; Controlul bolilor metabolice cum ar fi diabetul etc
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="personalInsights"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Insight-uri
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="personalInsights"
                      name="personalInsights"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "tatal care a avut diabet toata viata; de fiecare data cand luam masa in familie, el avea meniu separat si se chinuia foarte tare"
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: cea mai mare nevoie / dorință a clienților tăi. Ex: rețete rapide și sănătoase pentru slăbit
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Misiune
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Misiunea ta ca nutritionist-dietetician.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="personalReasons"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    De ce ai ales aceasta profesie?
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="personalReasons"
                      name="personalReasons"
                      rows={3}
                      className="outline-none block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      // defaultValue={
                      //   "Ca sa-i faca pe cei supraponderali sa ajunga la o greutate care sa-i ajute sa se simte bine in pielea lor."
                      // }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ex: Să îi ajut pe oameni să se mențină sănătoși printr-o nutriție corectă
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2 mt-5">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              Prin selectarea acestei opțiuni, sunteți de acord cu <Link to="/gdpr" className="font-semibold text-indigo-600">politica noastră de confidențialitate</Link>.
            </Switch.Label>
          </Switch.Group>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {navigation.state !== "submitting" ? (
              <button
                type="submit"
                className={classNames(
                  agreed ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600',
                  "block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                )}
                disabled={!agreed}
              >
                Genereaza
              </button>
            ) : (
              <button
                type="submit"
                className={classNames(
                  agreed ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600',
                  "block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  "inline-flex cursor-not-allowed justify-center"
                )}
                disabled={!agreed}
              >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Se genereaza...
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Brand Builder" },
    { name: "description", content: "Welcome to MPR Brand Builder!" },
  ];
};