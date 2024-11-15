import { Prisma } from "@prisma/client"; 
import { Conteudo } from "../../domain/conteudo.entity";
import { IConteudo, RecuperarConteudoProps } from "../../domain/conteudo.types";

class ConteudoMap {

    // Mapeia o Conteúdo do domínio para DTO (Data Transfer Object)
    public static toDTO(conteudo: Conteudo): IConteudo {
        return {
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.categoria, // Aqui já é esperado que categoria seja um objeto ou um campo simples
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm
        }
    }

    // Mapeia o Conteúdo do DTO (Data Transfer Object) para o Domínio
    public static toDomain(conteudo: RecuperarConteudoProps): Conteudo {
        return Conteudo.recuperar(conteudo);
    }

    // Converte o modelo do Prisma para o domínio, tratando a categoria como um objeto
    public static fromPrismaModelToDomain(conteudo: Prisma.ConteudoCreateInput & { category?: { nome: string } }): Conteudo {
        return ConteudoMap.toDomain({
            id: conteudo.id,
            titulo: conteudo.titulo,
            descricao: conteudo.descricao,
            categoria: conteudo.category 
                ? { nome: conteudo.category.nome }  // Se category existir, passa o nome
                : null, // Se não existir, passamos null para indicar que a categoria não foi definida
            autor: conteudo.autor,
            banner: conteudo.banner,
            publicadoEm: conteudo.publicadoEm as Date
        });
    }

}

export { ConteudoMap };
    