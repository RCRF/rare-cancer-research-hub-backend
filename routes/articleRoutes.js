import express from "express";
import * as articleController from "../controllers/articleController.js";
import { protectRouteAndCheckAdmin } from "../controllers/loginController.js";
import { requireAuth } from '@clerk/express'

const router = express.Router();

// create new article
router.route('/create')
  .post(
    requireAuth(),
    articleController.createInteralArticle
  );

// create new author
router.route('/:id/author')
  .post(
    requireAuth(),
    protectRouteAndCheckAdmin,
    articleController.createAuthor
  );

// delete an author
router.delete(
  "/:id/author/delete",
  requireAuth(),
  protectRouteAndCheckAdmin,
  articleController.deleteAuthor
);

// update article
router.patch(
  "/:id/author/update",
  requireAuth(),
  protectRouteAndCheckAdmin,
  articleController.updateAuthors
);

// update article
router.patch(
  "/:id/update",
  requireAuth(),
  protectRouteAndCheckAdmin,
  articleController.updateArticleOrder
);

// get article by id
router.get(
  "/:id/",
  requireAuth(),
  protectRouteAndCheckAdmin,
  articleController.getArticleById
);

export default router;
