import {  useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import tailwindStyles from "../index.css?inline";
import { ThemeProvider } from "./ThemeProvider";
import supabase from "@/supabaseClient";
import { Separator } from "./ui/separator";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState ( false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      p_project_id: projectId,
      p_user_name: form.elements.namedItem("name").value,
      p_user_email: form.elements.namedItem("email").value,
      p_message: form.elements.namedItem("feedback").value,
      p_rating: rating,
    };
    const { data: returnedData } = await supabase.rpc("add_feedback", data);
    setSubmitted(true);
    console.log(returnedData);
  };

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <style>{tailwindStyles}</style>
        <div className="widget fixed bottom-4 right-4 z-50">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full shadow-lg hover:scale-105">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                Feedback
              </Button>
            </PopoverTrigger>
            <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
              <style>{tailwindStyles}</style>
              {submitted ? (
                <div>
                  <h3 className="text-lg font-bold">
                    Thank you for your feedback!
                  </h3>
                  <p className="mt-4">
                    We appreciate your feedback. It helps us improve our product
                    and provide better service to our customers.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold"> Send us your feedback</h3>

                  <form className="space-y-2" onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Enter Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Tell us what you think"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`h-5 w-5 cursor-pointer ${
                              rating > index
                                ? "fill-primary"
                                : "fill-muted stroke-muted-foreground"
                            }`}
                            onClick={() => onSelectStar(index)}
                          />
                        ))}
                      </div>
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </div>
              )}
              <Separator className="my-4" />
              <div className="text-gray-600">
                Powered by{" "}
                <a
                  href="https://nexo-saas.vercel.app/"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  NEXO ⚡️
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ThemeProvider>
    </>
  );
};
function StarIcon({ className, onClick }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function MessageCircleIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}