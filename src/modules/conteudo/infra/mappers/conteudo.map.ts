import { Prisma } from "@prisma/client";
import { Conteudo } from "../../domain/conteudo.entity";
import { IConteudo, RecuperarConteudoProps } from "../../domain/conteudo.types";

class ConteudoMap {
    public static toDTO(conteudo: Conteudo): IConteudo {
        return {
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.categoria,  // Aqui, 'categoria' precisa ser um objeto correto
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm,
        };
    }

    public static toDomain(conteudo: RecuperarConteudoProps): Conteudo {
        return Conteudo.recuperar(conteudo);
    }

    public static fromPrismaModelToDomain(
        conteudo: Prisma.ConteudoCreateInput & { category?: { nome: string } }
    ): Conteudo {
        return ConteudoMap.toDomain({
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.category
                ? { nome: conteudo.category.nome }
                : { nome: "Sem Categoria" },  // Garantir que sempre tenha um nome
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm
                ? new Date(conteudo.publicadoEm)
                : new Date(),  // Usar data atual caso esteja faltando
        });
    }

    // Função para criar ou conectar categoria
    public static handleCategory(conteudo: any) {
        if (conteudo.categoryId) {
            return { connect: { id: conteudo.categoryId } }; // Conectar categoria existente
        } else if (conteudo.categoria) {
            return { create: { nome: conteudo.categoria } }; // Criar nova categoria
        } else {
            return null;  // Ou trate conforme necessário
        }
    }
}

export { ConteudoMap };
