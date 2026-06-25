export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold">
          EduExam Pro
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Smart Quiz, Attendance, Assignment &
          Analytics Platform for Schools,
          Teachers, Students and Parents.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/login"
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg border px-6 py-3"
          >
            Register
          </a>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          Developed By SB Designer
        </div>
      </section>
    </main>
  );
}