import forge from "node-forge";
export function useEncryptPassword() {
  const encryptPassword = (password: string) => {
    const publicKeyPem = import.meta.env.VITE_ENCRYPT_PUBLIC_KEY;
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

  return {
    encryptPassword,
  };
}
