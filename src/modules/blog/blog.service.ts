import { injectable } from "tsyringe";
import { PrismaService } from "../prisma/prisma.service";
import { GetblogsDTO } from "./dto/get-blog.dto";
import { Prisma } from "../../generated/prisma";
import { skip } from "node:test";

@injectable()
export class BlogService {
  private prisma: PrismaService;

  constructor(PrismaClient: PrismaService) {
    this.prisma = PrismaClient;
  }

  getBlogs = async (query: GetblogsDTO) => {
    const { page, take, sortBy, sortOrder, search } = query;

    const whereClause: Prisma.BlogWhereInput = {
      deletedAt: null,
    };

    if (search) {
      whereClause.title = { contains: search, mode: "insensitive" };
    }

    const blogs = await this.prisma.blog.findMany({
      where: whereClause,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * take,
      take,
      include: { user: { omit: { password: true } } },
    });

    const count = await this.prisma.blog.count({
      where: whereClause,
    });
    return {
      data: blogs,
      meta: { page, take, total: count },
    };
  };
}
