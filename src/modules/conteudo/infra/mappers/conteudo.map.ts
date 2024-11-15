import { Prisma } from "@prisma/client";
import { Conteudo } from "../../domain/conteudo.entity";
import { IConteudo, RecuperarConteudoProps } from "../../domain/conteudo.types";

class ConteudoMap {

    public static toDTO(conteudo: Conteudo): IConteudo {
        return {
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.categoria, // Certifique-se que categoria está presente
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm
        }
    }

    public static toDomain(conteudo: RecuperarConteudoProps): Conteudo {
        return Conteudo.recuperar(conteudo);
    }

    public static fromPrismaModelToDomain(conteudo: Prisma.ConteudoCreateInput & { category?: { nome: string } }): Conteudo {
        // Se category for fornecido, usamos o nome, senão retornamos "" ou algum valor padrão
        const categoria = conteudo.category ? { nome: conteudo.category.nome } : null;

        return ConteudoMap.toDomain({
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: categoria, // Aqui passamos o valor correto para categoria
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm as Date
        });
    }
}

export { ConteudoMap };
