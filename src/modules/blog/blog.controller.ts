import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { BlogService } from "./blog.service";
import { plainToInstance } from "class-transformer";
import { GetblogsDTO } from "./dto/get-blog.dto";

@injectable()
export class BlogController {
  private blogService: BlogService;

  constructor(BLogService: BlogService) {
    this.blogService = BLogService;
  }

  getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = plainToInstance(GetblogsDTO, req.query);
      const result = await this.blogService.getBlogs(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
