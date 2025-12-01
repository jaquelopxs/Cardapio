import bcrypt from "bcrypt";

export const gerarHash = async (senhaPura) => {
  return await bcrypt.hash(senhaPura, 10);
};

export const compararSenha = async (senhaDigitada, senhaHashBanco) => {
  return await bcrypt.compare(senhaDigitada, senhaHashBanco);
};
