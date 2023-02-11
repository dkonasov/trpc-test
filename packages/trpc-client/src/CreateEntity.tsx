import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRouter } from "trpc-server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: import.meta.env.VITE_BACKEND_URL })],
});

export const CreateEntity: FC = () => {
  const [ value, setValue ] = useState('');

  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.currentTarget as HTMLInputElement).value);
  };

  const save = async () => {
    await trpc.create.mutate({ name: value});
    navigate('/');
  }

  return (
    <div>
      <input type="text" onChange={onChange}/>
      <button type="button" onClick={save}>Create</button>
    </div>
  );
};
