"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ResultType {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: number[];
  alphabets: string[];
  highest_lowercase_alphabet: string;
}

export default function Home() {
  const { toast } = useToast();
  const [apiData, setApiData] = useState("");
  const [toggleNumber, setToggleNumber] = useState(false);
  const [toggleAlphabet, setToggleAlphabet] = useState(false);
  const [toggleHighestLowerAlphabet, setToggleHighestLowerAlphabet] =
    useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const handelSubmit = async () => {
    try {
      console.log("API Data: ", apiData);
      const body = await JSON.parse(apiData.replace(/\s+/g, ""));
      const response = await axios.post("/api/bfhl", body);
      toast({
        title: "Submitted",
        description: "Submission in progress",
      });

      console.log("Date from server : ", response.data);
      if (response.data.is_success) {
        toast({
          title: "Success!!",
          description: "Submission successful!!",
        });
        setResult(response.data);
      } else {
        
        toast({
          title: "Error!",
          description: `Error: ${response.data.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as any;
      toast({
        title: "Error!!",
        description:
          axiosError?.response?.data.message || "Failed to request!!",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="w-screen h-max p-10 flex flex-col justify-center items-center gap-10">
      <Textarea onChange={(e) => setApiData(e.target.value)} />
      <Button variant="outline" onClick={handelSubmit}>
        Submit
      </Button>
      <ToggleGroup type="multiple">
        <ToggleGroupItem
          value="a"
          onClick={() => setToggleNumber((prev) => !prev)}
        >
          Numbers
        </ToggleGroupItem>
        <ToggleGroupItem
          value="b"
          onClick={() => setToggleAlphabet((prev) => !prev)}
        >
          Alphabets
        </ToggleGroupItem>
        <ToggleGroupItem
          value="c"
          onClick={() => setToggleHighestLowerAlphabet((prev) => !prev)}
        >
          Highest lowercase alphabet
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex flex-col gap-5 justify-start w-full">
        {result &&
        !toggleNumber &&
        !toggleAlphabet &&
        !toggleHighestLowerAlphabet ? (
          <>
            <p>
              <b>is_success : </b> {result?.is_success}
            </p>
            <p>
              <b>User ID : </b> {result?.user_id}
            </p>
            <p>
              <b>Email : </b> {result?.email}
            </p>
            <p>
              <b>Roll number : </b> {result?.roll_number}
            </p>
            <p>
              <b>Numbers : </b> {result?.numbers.join(", ")}
            </p>
            <p>
              <b>Alphabets : </b> {result?.alphabets.join(", ")}
            </p>
            <p>
              <b>Highest lowercase alphabet : </b>
              {result?.highest_lowercase_alphabet}
            </p>
          </>
        ) : (
          <>
            {result && toggleNumber && (
              <p>
                <b>Numbers : </b> {result?.numbers.join(", ")}
              </p>
            )}
            {result && toggleAlphabet && (
              <p>
                <b>Alphabets : </b> {result?.alphabets.join(", ")}
              </p>
            )}
            {result && toggleHighestLowerAlphabet && (
              <p>
                <b>Highest lowercase alphabet : </b>
                {result?.highest_lowercase_alphabet}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
