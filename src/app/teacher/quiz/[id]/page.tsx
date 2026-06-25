import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteQuestionButton from "@/components/teacher/delete-question-button";
import BackButton from "@/components/common/back-button";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizDetailsPage({
  params,
}: PageProps) {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "TEACHER"
  ) {
    redirect("/login");
  }

  const { id } =
    await params;

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
  <div className="p-6">

    <div className="mb-4">
      <BackButton />
    </div>

    <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {quiz.title}
        </h1>

        <p className="text-gray-500">
          {quiz.description}
        </p>
      </div>

      <div className="space-y-4">
        {quiz.questions.map(
          (question, index) => (
            <div
              key={question.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >
              <h3 className="mb-4 text-lg font-semibold">
                Q{index + 1}.{" "}
                {question.question}
              </h3>

              <div className="space-y-2">

                <p>
                  A.{" "}
                  {question.optionA}
                </p>

                <p>
                  B.{" "}
                  {question.optionB}
                </p>

                <p>
                  C.{" "}
                  {question.optionC}
                </p>

                <p>
                  D.{" "}
                  {question.optionD}
                </p>

              </div>

              <div className="mt-4 flex items-center justify-between">
  <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
    Correct Answer:{" "}
    {question.correctAnswer}
  </span>

  <div className="flex gap-2">
    <Link
      href={`/teacher/question/${question.id}/edit`}
      className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
    >
      Edit
    </Link>

    <DeleteQuestionButton
      questionId={question.id}
    />
  </div>
</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}