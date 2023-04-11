export enum ChatCompletionResponseMessageRoleEnum {
  System = "system",
  User = "user",
  Assistant = "assistant"
};

export type ChatMessage = {
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
  name?: string;
}

export type ChatConversation = {
  messages: ChatMessage[];
}
