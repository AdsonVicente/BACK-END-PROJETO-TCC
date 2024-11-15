import { Prisma } from "@prisma/client"; 
import { Conteudo } from "../../domain/conteudo.entity";
import { IConteudo, RecuperarConteudoProps } from "../../domain/conteudo.types";

class ConteudoMap {

    public static toDTO(conteudo: Conteudo): IConteudo {
        return {
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.categoria, // Assegure-se que categoria é um objeto esperado
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm
        }
    }

    public static toDomain(conteudo: RecuperarConteudoProps): Conteudo {
        return Conteudo.recuperar(conteudo);
    }

    public static fromPrismaModelToDomain(conteudo: Prisma.ConteudoCreateInput & { category?: { nome: string } }): Conteudo {
        return ConteudoMap.toDomain({
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.category ? { nome: conteudo.category.nome } : { nome: "" }, // Retorna o nome da categoria se existir, senão retorna um objeto vazio
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm as Date
        });
    }

}

export { ConteudoMap };
