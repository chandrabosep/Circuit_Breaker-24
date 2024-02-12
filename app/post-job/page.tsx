import JobForm from "@/components/JobForm";

export default function page() {
  return (
    <div className="w-10/12 m-auto">
      <h1 className="text-3xl font-bold text-center py-8">Post a Job</h1>
      <JobForm />
    </div>
  );
}
