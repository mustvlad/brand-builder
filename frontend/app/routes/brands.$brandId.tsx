import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.brandId, "Missing brandId param");

  const apiUrl = "http://localhost:8888/brands/" + params.brandId;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    redirect: 'follow'
  });

  const brandEntry = await res.json();
  
  if (!brandEntry) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json( brandEntry );
}

export default function Brand() {
  const brandEntry = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div className="animate-[spin_20s_linear_infinite] relative left-0 -z-10 aspect-[1155/2155] w-[24rem] max-w-none bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-70 sm:aspect-[1155/678] sm:left-[calc(50%-40rem)] sm:w-[80rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      
      <div className="mx-auto max-w-2xl text-center mb-24 pt-24 sm:pt-32 px-5 sm:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Povestea ta</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Exploreaza povestea brandului tau.
        </p>
      </div>
      
      <div className="mx-auto max-w-xl pb-24 sm:pb-32 px-5 sm:px-0">
        <div className="mt-10 mb-6 border-b border-gray-900/10 pb-12">
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Autobiografie
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-wrap">
                  {brandEntry.autobiography}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Piloni de continut
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-wrap">
                  {brandEntry.contentPillars}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex items-center justify-start gap-x-6">
          <Link to="/" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Inapoi</Link>
        </div>
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