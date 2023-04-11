import { useState } from "react";
import styled from "styled-components";
import { ChatCompletionResponseMessageRoleEnum, ChatConversation, ChatMessage } from "../types/chat-completion.type";
import {useMutation} from "@tanstack/react-query";
import GptApi from "../api/GptApi";
import ReactMarkdown from 'react-markdown';
import { event as analyticsEvent } from "nextjs-google-analytics";

const StyledPage = styled.div`
  .page {
  }
`;

function Index(): JSX.Element {
  const { isLoading, isError, data, mutateAsync } = useMutation( (params: unknown) => GptApi.chatCompletion(params),{
    onSuccess:() => {
      !isModalOpen && setIsModalOpen(true);
    }
  });

  const aiResponseText = data?.data

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [industry, setIndustry] = useState<string>('')
  const [ageGroup, setAgeGroup] = useState<string>('all')
  const [country, setCountry] = useState<string>('Philippines')
  const [response, setResponse] = useState<string>('')
  const [conversation, setConversation] = useState<ChatConversation>(null)

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    try {
      event.preventDefault()
      setConversation(null)

      const data = {
        values: {
          industry: industry,
          ageGroup: ageGroup,
          country: country
        }
      };

      const appCompletionResponse = await mutateAsync(data)

      const newAIChatMessage: ChatMessage = {
        role: ChatCompletionResponseMessageRoleEnum.Assistant,
        content: appCompletionResponse.data
      }

      const newConversation = {
        messages: [newAIChatMessage]
      };

      setConversation(newConversation);

      // TODO: Change the values to actual values
      analyticsEvent("sample_event", {
        category: `Sample category`,
        label: `Sample label`,
      });
    } catch (error) {
      console.error(error)
    }
  }

  async function handleUserResponse(event: React.FormEvent): Promise<void> {
    try {
      event.preventDefault()

      const newUserChatMessage: ChatMessage = {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: response
      }

      const newConversation = conversation;
      newConversation.messages.push(newUserChatMessage);

      const data = {
        values: {
          industry: industry,
          ageGroup: ageGroup,
          country: country
        },
        messages: newConversation.messages
      };

      const appCompletionResponse = await mutateAsync(data)

      const newAIChatMessage: ChatMessage = {
        role: ChatCompletionResponseMessageRoleEnum.Assistant,
        content: appCompletionResponse.data
      }

      newConversation.messages.push(newAIChatMessage);

      // Only set the conversation here so that in case there is an error, the conversation will not be updated
      setConversation(newConversation);
      setResponse('');

      // TODO: Change the values to actual values
      analyticsEvent("sample_event", {
        category: `Sample category`,
        label: `Sample label`,
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledPage>
      <section>

        <div className={`modal ${isModalOpen ? "modal-open" : "modal-close"}`} id="my-modal-2">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Result</h3>
            <article className="prose">
            <ReactMarkdown className="py-4 ai-response">
            {aiResponseText}
            </ReactMarkdown>
            </article>
            <div className="mb-4">
              <input type="text" value={response} onChange={(e) => setResponse(e.target.value)} id="response" name="response" className="input input-bordered w-full" required disabled={isLoading} />
            </div>
            <div className="modal-action">
              <button onClick={handleUserResponse} className={`btn btn-primary ${isLoading ? "loading" : ""}`}>Respond</button>
              <button onClick={() => setIsModalOpen(false)} className={`btn ${isLoading ? "loading" : ""}`}>Try again</button>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside
            className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
          >
            <img
              alt="Pattern"
              src="/images/side-image.png"
              className="absolute inset-0 h-full w-full object-cover"
            />

          </aside>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="card card-compact w-120 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h1 className="card-title text-3xl">Startup Generator 💡</h1>
                  <p className="mt-4 leading-relaxed text-gray-500">
                    Discover your next big idea with our startup generator app! Get unique and tailored startup ideas instantly, so you can focus on bringing your vision to life. Start building your dream business!
                  </p>
                  <form action="#" className="mt-5 flex flex-col">
                    <div className="mb-4">
                      <label className="label" htmlFor="industry">
                        <span className="label-text">Industry</span>
                      </label>
                      <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} id="industry" name="industry" placeholder="Input a relevant industry" className="input input-bordered w-full" required disabled={isLoading} />
                    </div>

                    <div className="mb-4">
                      <div className="form-control w-full">
                        <label className="label" htmlFor="age-group">
                          <span className="label-text">Age Group</span>
                        </label>
                        <select id="age-group" defaultValue='all' name="age-group" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="select select-bordered w-full" disabled={isLoading}>
                          <option value="0-1">Infants (0-1 year)</option>
                          <option value="1-3">Toddlers (1-3 years)</option>
                          <option value="3-5">Preschoolers (3-5 years)</option>
                          <option value="6-12">Children (6-12 years)</option>
                          <option value="9-12">Tweens (9-12 years)</option>
                          <option value="13-17">Teens (13-17 years)</option>
                          <option value="18-24">Young Adults (18-24 years)</option>
                          <option value="25-34">Adults (25-34 years)</option>
                          <option value="35-44">Adults (35-44 years)</option>
                          <option value="45-54">Adults (45-54 years)</option>
                          <option value="55-64">Adults (55-64 years)</option>
                          <option value="65-74">Seniors (65-74 years)</option>
                          <option value="75+">Seniors (75+ years)</option>
                          <option value="all">All</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="label" htmlFor="country">
                        <span className="label-text">Country</span>
                      </label>
                      <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country of operations" className="input input-bordered w-full" disabled={isLoading} />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleSubmit}
                        className={`btn btn-primary ${isLoading ? "loading" : ""}`} disabled={isLoading}
                      >
                        Generate Startup
                      </button>
                    </div>
                  </form>
                </div>
              </div>


              <p id="love" className="inline-block">
                Crafted with
                <svg
                  fill="currentColor"
                  stroke="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                by <a className="underline" href="http://symph.co/">Symph</a>
              </p>
            </div>
          </main>
        </div>
      </section>
      {isError && (
        <div className="toast">
          <div className="alert alert-error">
            <div>
              <span>Something went wrong</span>
            </div>
          </div>
        </div>
      )}
    </StyledPage>
  );
}

export default Index;
