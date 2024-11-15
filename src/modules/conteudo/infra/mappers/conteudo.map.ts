import { Prisma } from "@prisma/client";
import { Conteudo } from "../../domain/conteudo.entity";
import { IConteudo, RecuperarConteudoProps } from "../../domain/conteudo.types";

class ConteudoMap {
    /**
     * Converte uma entidade de domínio para um DTO
     */
    public static toDTO(conteudo: Conteudo): IConteudo {
        return {
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.categoria, // Assegure-se que 'categoria' em 'Conteudo' seja compatível com IConteudo
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm,
        };
    }

    /**
     * Converte as propriedades para criar uma instância de domínio
     */
    public static toDomain(conteudo: RecuperarConteudoProps): Conteudo {
        return Conteudo.recuperar(conteudo);
    }

    /**
     * Converte um modelo Prisma para uma entidade de domínio
     */
    public static fromPrismaModelToDomain(
        conteudo: Prisma.ConteudoCreateInput & { category?: { nome: string } }
    ): Conteudo {
        return ConteudoMap.toDomain({
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.category
                ? { nome: conteudo.category.nome } // Retorna o nome se existir
                : { nome: "Sem Categoria" }, // Nome padrão para casos onde a categoria é nula ou indefinida
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm
            ? new Date(conteudo.publicadoEm) // Converte para Date se for uma string válida
            : new Date(), // Atribui a data atual como valor padrão
        
        });
    }
}

export { ConteudoMap };
