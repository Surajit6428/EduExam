import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import QuizAttemptForm from "@/components/student/quiz-attempt-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizAttemptPage({
  params,
}: PageProps) {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "STUDENT"
  ) {
    redirect("/login");
  }

  const { id } =
    await params;

  // Check if student already attempted this quiz
  const alreadyAttempted =
    await prisma.quizAttempt.findFirst({
      where: {
        quizId: id,
        studentId: user.id,
      },
    });

  if (alreadyAttempted) {
    return (
      <div className="mx-auto max-w-xl p-10">
        <div className="rounded-2xl border bg-white p-8 text-center shadow">

          <h1 className="mb-4 text-3xl font-bold text-red-600">
            Quiz Already Attempted
          </h1>

          <p className="text-gray-600">
            You have already submitted this quiz.
          </p>

          <div className="mt-6 rounded-lg bg-green-100 p-6">
            <p className="text-lg font-semibold">
              Your Score
            </p>

            <p className="mt-2 text-5xl font-bold text-green-600">
              {alreadyAttempted.score}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const quiz =
    await prisma.quiz.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });

  if (!quiz) {
    return (
      <div className="p-6">
        Quiz Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        {quiz.title}
      </h1>

      <p className="mb-8 text-gray-500">
        {quiz.description}
      </p>

      <QuizAttemptForm
        quizId={quiz.id}
        studentId={user.id}
        questions={quiz.questions}
      />
    </div>
  );
}