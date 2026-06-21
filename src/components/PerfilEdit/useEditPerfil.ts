import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import { ArtistaEditDTO, ArtistaService } from "@/services/ArtistaService";
import ContatoService from "@/services/ContatoService";
import { ContratanteEditDTO, ContratanteService } from "@/services/ContratanteService";
import UsuarioService from "@/services/UsuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Contato } from "./ContatoInput/types";
import { TipoContato } from "@/models/enumeration/TipoContato";


export type TipoUsuario = "artista" | "contratante" | null;

export type FormPerfil = {
  nome: string;
  textoBio: string;
  nomeLog: string;
  numLog: string;
  cep: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
  razaoSocial: string;
};

const FORM_INICIAL: FormPerfil = {
  nome: "",
  textoBio: "",
  nomeLog: "",
  numLog: "",
  cep: "",
  bairro: "",
  complemento: "",
  cidade: "",
  uf: "",
  razaoSocial: "",
};

const TIPO_WHATSAPP = 1;
const TIPO_INSTAGRAM = 2;

function mapearContatos(contatos: any[] | undefined, tipo: number): Contato[] {
   if (!contatos) return [];

   return contatos
     .filter((c: any) => c.tipoContato?.idTipoContato === tipo)
     .map((c): Contato => ({
      id: c.idContato,
      valor: c.valorContato || "",
      tipo,
    }));
}

export function useEditPerfil() {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [form, setForm] = useState<FormPerfil>(FORM_INICIAL);

  const [contatosEmail, setContatosEmail] = useState<Contato[]>([]);
  const [contatosTelegram, setContatosTelegram] = useState<Contato[]>([]);
  const [contatosInstagram, setContatosInstagram] = useState<Contato[]>([]);
  const [contatosTelefone, setContatosTelefone] = useState<Contato[]>([]);

  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  function mostrarErro(mensagem: string) {
    setErrorMessage(mensagem);
    setAlert(true);
  }

  function mostrarSucesso(mensagem: string) {
    setDialogMessage(mensagem);
    setDialog(true);
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  async function obterToken() {
    const tokenData = await AsyncStorage.getItem("@artconnect:token");
    if (!tokenData) {
      router.navigate("/login");
      return null;
    }
    return JSON.parse(tokenData) as AuthLoginResponse;
  }

  async function carregarDadosIniciais() {
    try {
      const tokenParse = await obterToken();
      if (!tokenParse) return;

      const model = await UsuarioService.findById(tokenParse.id, tokenParse.token);

      setUser(model);
      setFotoUri(model.fotoPerfilUrl ?? null);
      setTipoUsuario(model.tipoConta === "CONTRATANTE" ? "contratante" : "artista");
      preencherFormulario(model);

      setContatosEmail(mapearContatos(model.contatos as any, TipoContato.EMAIL));
      setContatosTelegram(mapearContatos(model.contatos as any, TipoContato.TELEGRAM));
      setContatosInstagram(mapearContatos(model.contatos as any, TipoContato.INSTAGRAM));
      setContatosTelefone(mapearContatos(model.contatos as any, TipoContato.TELEFONE));
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      mostrarErro("Não foi possível carregar os dados do perfil");
    } finally {
      setLoading(false);
    }
  }

  function preencherFormulario(model: UsuarioResponse) {
    setForm({
      nome: model.nome ?? "",
      textoBio: model.textoBio ?? "",
      nomeLog: model.nomeLog ?? "",
      numLog: model.numLog ? String(model.numLog) : "",
      cep: model.cep ?? "",
      bairro: model.bairro ?? "",
      complemento: model.complemento ?? "",
      cidade: model.cidade ?? "",
      uf: model.uf ?? "",
      razaoSocial: (model as any).razaoSocial ?? "",
    });
  }

  function alterarCampo(campo: keyof FormPerfil, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function solicitarPermissaoGaleria(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      mostrarErro("Precisamos de acesso à sua galeria para alterar a foto de perfil.");
      return false;
    }
    return true;
  }

  async function selecionarImagemGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (resultado.canceled) return null;
    return resultado.assets[0];
  }

  async function handleAlterarFoto() {
    const temPermissao = await solicitarPermissaoGaleria();
    if (!temPermissao) return;

    const imagemSelecionada = await selecionarImagemGaleria();
    if (!imagemSelecionada) return;

    try {
      setUploadingFoto(true);

      const arquivo = {
        uri: imagemSelecionada.uri,
        name: imagemSelecionada.fileName || `foto-perfil-${Date.now()}.jpg`,
        type: imagemSelecionada.mimeType || "image/jpeg",
      };

      await UsuarioService.updateFotoPerfil(arquivo);

      setFotoUri(imagemSelecionada.uri);

      const usuarioAtualizado = await UsuarioService.getCurrentUser();
      setFotoUri(usuarioAtualizado.fotoPerfilUrl || imagemSelecionada.uri);
    } catch (error: any) {
      console.error("Erro ao alterar foto:", error);
      mostrarErro(error.message || "Não foi possível atualizar a foto de perfil");
    } finally {
      setUploadingFoto(false);
    }
  }

  function limparUndefined<T extends Record<string, any>>(payload: T): T {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });
    return payload;
  }

  function prepararPayloadArtista(): ArtistaEditDTO {
    return limparUndefined<ArtistaEditDTO>({
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
    });
  }

  function prepararPayloadContratante(): ContratanteEditDTO {
    return limparUndefined<ContratanteEditDTO>({
      nome: form.nome || undefined,
      textoBio: form.textoBio || undefined,
      nomeLog: form.nomeLog || undefined,
      numLog: form.numLog ? Number(form.numLog) : undefined,
      cep: form.cep || undefined,
      bairro: form.bairro || undefined,
      complemento: form.complemento || undefined,
      cidade: form.cidade || undefined,
      uf: form.uf || undefined,
      razaoSocial: form.razaoSocial || undefined,
    });
  }

  async function salvarContatos(token: string) {
    const contatos = [
      ...contatosTelefone, 
      ...contatosInstagram,
      ...contatosTelegram,
      ...contatosEmail,
    ].filter((c) => c.valor.trim());

    for (const contato of contatos) {
      if (contato.id) {
        await ContatoService.edit(contato.id, { valorContato: contato.valor }, token);
      } else {
        await ContatoService.save(
          { valorContato: contato.valor, idTipoContato: contato.tipo },
          token,
        );
      }
    }
  }

  async function handleSalvar() {
    if (!user || !tipoUsuario) return;

    try {
      setSaving(true);

      const tokenParse = await obterToken();
      if (!tokenParse) return;

      if (tipoUsuario === "artista") {
        await ArtistaService.edit(tokenParse.token, prepararPayloadArtista());
      } else {
        await ContratanteService.edit(tokenParse.token, prepararPayloadContratante());
      }

      await salvarContatos(tokenParse.token);

      mostrarSucesso("Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      mostrarErro(error.message || "Não foi possível salvar as alterações");
    } finally {
      setSaving(false);
    }
  }

  async function removerContatoRemoto(contatoId?: number) {
    if (!contatoId) return;

    const tokenParse = await obterToken();
    if (!tokenParse) return;

    try {
      await ContatoService.delete(contatoId, tokenParse.token);
    } catch (error: any) {
      console.error("Erro ao remover contato:", error);
      mostrarErro(error.message || "Não foi possível remover o contato");
    }
  }

  // -------------------------------

  function handleRemoverContatoTelefone(index: number) {
    return removerContatoRemoto(contatosTelefone[index]?.id);
  }
  function handleRemoverContatoInstagram(index: number) {
    return removerContatoRemoto(contatosInstagram[index]?.id);
  }
  function handleRemoverContatoEmail(index: number) {
    return removerContatoRemoto(contatosEmail[index]?.id);
  }
  function handleRemoverContatoTelegram(index: number) {
    return removerContatoRemoto(contatosTelegram[index]?.id);
  }
  // -------------------------------

  function fecharDialog() {
    setDialog(false);
    router.navigate("/perfil");
  }

  return {
    loading,
    saving,
    tipoUsuario,
    fotoUri,
    uploadingFoto,
    form,
    alterarCampo,
    handleAlterarFoto,
    handleSalvar,
    //-----
    contatosEmail,
    setContatosEmail,
    contatosTelegram,
    setContatosTelegram,
    contatosInstagram,
    setContatosInstagram,
    contatosTelefone,
    setContatosTelefone,
    //-------
    handleRemoverContatoTelefone,
    handleRemoverContatoInstagram,
    handleRemoverContatoEmail,
    handleRemoverContatoTelegram,
    alert: {
      visible: alert,
      text: errorMessage,
      onDismiss: () => setAlert(false),
    },
    dialog: {
      visible: dialog,
      text: dialogMessage,
      onConfirm: fecharDialog,
    },
  };
}