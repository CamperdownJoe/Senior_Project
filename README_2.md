# 项目

https://claude.ai/chat/b870e661-4607-442b-939b-2bc8a8fcbbc1

添加上源
git remote add upstream https://github.com/mickasmt/next-saas-stripe-starter.git


## 开发流程

1. 更新代码
git fetch upstream
git checkout main
git merge upstream/main

2. 进行开发
... 编写您的代码 ...

3. 提交更改
git add .
git commit -m "描述您的更改"

4. 推送到您的私有仓库
git push origin main

5. 定期重复这个过程


## 项目描述


我想要完成一个项目。
用户会导出他们在edge或者chrome的书签，我们会帮他们完成自动书签重新分类。

我计划使用next.js + tailwind + shadcn 完成。

自动分类的方法，我计划是，我们首先会得到所有的url，所有的收藏时间，所有的 title


我计划使用 AI 完成，使用 gpt来完成分类。我的想法是，首先，确定用户是什么用户，计算机人员？确定之后，设计prompt，首先将全部的 数据传递给 gpt，让他给出合理的分类路径。 然后等待用户确认。用户可以添加或者减少。之后，我们会根据分类，然后将每一个书签，都让AI选择一个，这样就完成了所有的自动分类。这样可以大大帮助用户整理臃肿的书签。


在处理分类之前，我们导入了用户的标签数据，我们首先需要去重 + 删除无效url。
去重很好做到，我们只需要判断 url是否相等既可。
对于无效url，一些可能是目前已经无用的url，这意味着网站关闭了，此时我记得有一个webarchieve，我们可以尝试找一下有没有缓存，如果没有的话就删除。还有一些url，使用户可能是调试的一些url，通常为携带ip的，这类我计划不删除，而是用一个单独的文件夹让用户存储。

事实上，我觉得用户 使用我们工具的一个原因就是，整理这些东西太复杂了，这个过程很痛苦。当面对1000+书签的时候，用户真的不想去整理。

我希望使用AI处理就是，减弱用户的痛苦。

我希望，我的应用很简单，就是自动帮用户整理书签。

用户应该可以通过简单的几个点击，一点思考，基于可以完成。

我希望用户在使用我的工具时，能够收到实时反馈，他能看到，我们正在处理这些书签。

而且我希望，用户可以看到处理前后的对比。

对于分类的生成
我们尽量保证一级目录，如果某一目录下内容过多，我们分为多级目录。我希望，当我们给出建议的分类目录时，我们可以显示在UI上，用类似于思维导图的形式，用户只需要点击确认，就可以继续执行，而且用户也可以看到我们到底做了什么，生成了那些建议的目录


你觉得应该怎么设计UI呢？


## tips

tree -L 2 -I 'node_modules'

windows 下 tree

tree . /F

Hand-drawn like style


Mind-Elixir 布局
Excalidraw 手绘风格

## Html 书签格式

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1719392603" LAST_MODIFIED="1723962576" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Bar</H3>
    <DL><p>
        <DT><H3 ADD_DATE="1611576970" LAST_MODIFIED="1624701243">Programming</H3>
        <DL><p>
            <DT><A HREF="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" ADD_DATE="1611576960">JavaScript Guide - MDN</A>
            <DT><A HREF="https://www.python.org/doc/" ADD_DATE="1611580430">Python Documentation</A>
            <DT><A HREF="https://stackoverflow.com/questions/50710476" ADD_DATE="1611581580">How to fix "AttributeError" in Python</A>
        </DL><p>
        <DT><H3 ADD_DATE="1611576971" LAST_MODIFIED="1624701244">News</H3>
        <DL><p>
            <DT><A HREF="https://www.bbc.com/news" ADD_DATE="1611582000">BBC News</A>
            <DT><A HREF="https://www.nytimes.com/" ADD_DATE="1611582010">The New York Times</A>
        </DL><p>
        <DT><H3 ADD_DATE="1611576972" LAST_MODIFIED="1624701245">Learning</H3>
        <DL><p>
            <DT><A HREF="https://www.coursera.org/" ADD_DATE="1611583000">Coursera</A>
            <DT><A HREF="https://www.edx.org/" ADD_DATE="1611583010">edX</A>
        </DL><p>
    </DL><p>
    <DT><A HREF="https://www.edx.org/" ADD_DATE="1611583010">edX</A>
</DL><p>

```


## WSL2 下 无法热更新 next.js
https://stackoverflow.com/questions/69276057/wsl-2-react-not-reloading-with-file-changes



## 一些有用的信息

https://ws-dl.blogspot.com/
https://archive.org/help/wayback_api.php

https://platform.openai.com/docs/guides/structured-outputs/introduction?context=without_parse&lang=node.js

https://community.openai.com/t/how-do-i-use-the-new-json-mode/475890/41

## 数据库问题

在 github codespace 可以连接数据库，但是在 wsl2 无法连接，不知道为什么

```
from sqlalchemy import create_engine, exc
from sqlalchemy.engine import URL

# 构建连接字符串，添加 endpoint 参数
connection_string = URL.create(
    'postgresql',
    username='BookmarkDB_owner',
    password='GX7NlBWVr4eK',
    host='ep-quiet-morning-a5899c2h.us-east-2.aws.neon.tech',
    database='BookmarkDB',
    query={'sslmode': 'require', 'options': 'endpoint=ep-quiet-morning-a5899c2h'}
)

# 创建数据库引擎
engine = create_engine(connection_string)

# 尝试连接数据库
try:
    with engine.connect() as connection:
        print("Connection to the database was successful!")
except exc.SQLAlchemyError as e:
    print(f"An error occurred: {e}")

```



npx prisma studio

npx prisma db push


国内的免费数据库
https://cloud.memfiredb.com/db/manage/databases

Prisma + neon 的问题

这是因为 neon 的数据库无法在国内连接的原因

无论是us，还是 sg 的数据库都无法连接

当把数据库更换为 tencent 的mysql之后，可以成功发送 要请登陆的链接，成功使用 resend

解决这个问题不需要更改proxy

可以解决 发送邮件的文件




但是依然无法解决，使用 google 认证的问题，即使使用 set proxy



测试当前terminal是否能链接google
curl -L http://www.google.com

##

Wow, thanks, but I think we need to discuss some problems. 

we have Bookmark type, right? And we use BookmarkMap to store the user BookMark, right?

When we talk about reorganaztion the bookmark, we need suitable data structrure to store the structure.

In my opinion.
For bookmark category, I think 1-2 level is suitable, it 3 level, there is so detail, user might can't find bookmark. 

I think if user has little bookmarks, we just use 1 level, if has many, we use 2 level.


## structure


├── LICENSE.md
├── README.md
├── README_2.md
├── Test_AI_API.ipynb
├── actions
│   ├── generate-user-stripe.ts
│   ├── open-customer-portal.ts
│   ├── update-user-name.ts
│   └── update-user-role.ts
├── app
│   ├── (auth)
│   │   ├── layout.tsx
│   │   ├── login
│   │   └── register
│   ├── (docs)
│   │   ├── docs
│   │   ├── guides
│   │   └── layout.tsx
│   ├── (marketing)
│   │   ├── (blog-post)
│   │   ├── [slug]
│   │   ├── blog
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── pricing
│   ├── (protected)
│   │   ├── admin
│   │   ├── dashboard
│   │   └── layout.tsx
│   ├── api
│   │   ├── ai-recommend
│   │   ├── auth
│   │   ├── check-url
│   │   ├── og
│   │   ├── user
│   │   └── webhooks
│   ├── bookmark-manager
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── opengraph-image.jpg
│   ├── organize-bookmarks
│   │   ├── components
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── utils
│   └── robots.ts
├── assets
│   └── fonts
│       ├── CalSans-SemiBold.ttf
│       ├── CalSans-SemiBold.woff2
│       ├── GeistVF.woff2
│       ├── Inter-Bold.ttf
│       ├── Inter-Regular.ttf
│       └── index.ts
├── auth.config.ts
├── auth.ts
├── components
│   ├── analytics.tsx
│   ├── bookmarkmanager
│   │   └── BookmarkManager.tsx
│   ├── charts
│   │   ├── area-chart-stacked.tsx
│   │   ├── bar-chart-mixed.tsx
│   │   ├── interactive-bar-chart.tsx
│   │   ├── line-chart-multiple.tsx
│   │   ├── radar-chart-simple.tsx
│   │   ├── radial-chart-grid.tsx
│   │   ├── radial-shape-chart.tsx
│   │   ├── radial-stacked-chart.tsx
│   │   └── radial-text-chart.tsx
│   ├── content
│   │   ├── author.tsx
│   │   ├── blog-card.tsx
│   │   ├── blog-header-layout.tsx
│   │   ├── blog-posts.tsx
│   │   ├── mdx-card.tsx
│   │   └── mdx-components.tsx
│   ├── dashboard
│   │   ├── delete-account.tsx
│   │   ├── header.tsx
│   │   ├── info-card.tsx
│   │   ├── project-switcher.tsx
│   │   ├── search-command.tsx
│   │   ├── section-columns.tsx
│   │   ├── shell.tsx
│   │   ├── transactions-list.tsx
│   │   └── upgrade-card.tsx
│   ├── docs
│   │   ├── page-header.tsx
│   │   ├── pager.tsx
│   │   ├── search.tsx
│   │   └── sidebar-nav.tsx
│   ├── forms
│   │   ├── billing-form-button.tsx
│   │   ├── customer-portal-button.tsx
│   │   ├── newsletter-form.tsx
│   │   ├── user-auth-form.tsx
│   │   ├── user-name-form.tsx
│   │   └── user-role-form.tsx
│   ├── layout
│   │   ├── dashboard-sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── navbar.tsx
│   │   ├── site-footer.tsx
│   │   └── user-account-nav.tsx
│   ├── modals
│   │   ├── auth-modal.tsx
│   │   ├── delete-account-modal.tsx
│   │   ├── providers.tsx
│   │   └── sign-in-modal.tsx
│   ├── pricing
│   │   ├── billing-info.tsx
│   │   ├── compare-plans.tsx
│   │   ├── pricing-cards.tsx
│   │   └── pricing-faq.tsx
│   ├── sections
│   │   ├── bentogrid.tsx
│   │   ├── features.tsx
│   │   ├── hero-landing.tsx
│   │   ├── info-landing.tsx
│   │   ├── powered.tsx
│   │   ├── preview-landing.tsx
│   │   └── testimonials.tsx
│   ├── shared
│   │   ├── blur-image.tsx
│   │   ├── callout.tsx
│   │   ├── card-skeleton.tsx
│   │   ├── copy-button.tsx
│   │   ├── empty-placeholder.tsx
│   │   ├── header-section.tsx
│   │   ├── icons.tsx
│   │   ├── max-width-wrapper.tsx
│   │   ├── section-skeleton.tsx
│   │   ├── toc.tsx
│   │   └── user-avatar.tsx
│   ├── tailwind-indicator.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── modal.tsx
│       ├── navigation-menu.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       └── use-toast.ts
├── components.json
├── config
│   ├── blog.ts
│   ├── dashboard.ts
│   ├── docs.ts
│   ├── landing.ts
│   ├── marketing.ts
│   ├── site.ts
│   └── subscriptions.ts
├── content
│   ├── blog
│   │   ├── deploying-next-apps.mdx
│   │   ├── dynamic-routing-static-regeneration.mdx
│   │   ├── preview-mode-headless-cms.mdx
│   │   └── server-client-components.mdx
│   ├── docs
│   │   ├── configuration
│   │   ├── in-progress.mdx
│   │   ├── index.mdx
│   │   └── installation.mdx
│   ├── guides
│   │   ├── build-blog-using-contentlayer-mdx.mdx
│   │   └── using-next-auth-next-13.mdx
│   └── pages
│       ├── privacy.mdx
│       └── terms.mdx
├── contentlayer.config.ts
├── emails
│   └── magic-link-email.tsx
├── env.mjs
├── hooks
│   ├── use-intersection-observer.ts
│   ├── use-local-storage.ts
│   ├── use-lock-body.ts
│   ├── use-media-query.ts
│   ├── use-mounted.ts
│   └── use-scroll.ts
├── lib
│   ├── db.ts
│   ├── email.ts
│   ├── exceptions.ts
│   ├── parseBookmarks.ts
│   ├── passwordUtils.ts
│   ├── rateLimit.ts
│   ├── session.ts
│   ├── stripe.ts
│   ├── subscription.ts
│   ├── toc.ts
│   ├── types.ts
│   ├── user.ts
│   ├── utils.ts
│   └── validations
│       ├── auth.ts
│       ├── og.ts
│       └── user.ts
├── middleware.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── prettier.config.js
├── prisma
│   ├── migrations
│   │   └── 0_init
│   └── schema.prisma
├── public
│   ├── _static
│   │   ├── avatars
│   │   ├── blog
│   │   ├── docs
│   │   ├── favicons
│   │   ├── illustrations
│   │   └── og.jpg
│   ├── favicon.ico
│   └── site.webmanifest
├── styles
│   ├── globals.css
│   └── mdx.css
├── tailwind.config.ts
├── tsconfig.json
└── types
    ├── index.d.ts
    └── next-auth.d.ts


## 表现得很好的左右结构的图

```
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  useNodesState, 
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  Position
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';

import { BookmarkStructure, Bookmark } from '@/lib/types';

interface BookmarkFlowChartProps {
  structure: BookmarkStructure;
  bookmarks: Map<string, Bookmark>;
}

const MAX_BOOKMARKS_PER_CATEGORY = 3;

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const BookmarkFlowChart: React.FC<BookmarkFlowChartProps> = ({ structure, bookmarks }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const convertToFlowElements = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Add root node
    newNodes.push({
      id: 'root',
      data: { label: 'BOOKMARKS' },
      position: { x: 0, y: 0 },
      type: 'input',
    });

    Object.entries(structure).forEach(([categoryName, category], index) => {
      const categoryId = `category-${index}`;
      newNodes.push({
        id: categoryId,
        data: { label: categoryName },
        position: { x: 0, y: 0 },
      });
      newEdges.push({
        id: `root-${categoryId}`,
        source: 'root',
        target: categoryId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
      });

      // Add subcategory nodes and edges
      Object.entries(category.subcategories || {}).forEach(([subName, subCategory], subIndex) => {
        const subId = `${categoryId}-sub-${subIndex}`;
        newNodes.push({
          id: subId,
          data: { label: subName },
          position: { x: 0, y: 0 },
        });
        newEdges.push({
          id: `${categoryId}-${subId}`,
          source: categoryId,
          target: subId,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed },
        });

        // Add a sample of bookmark nodes for subcategory
        subCategory.bookmarks.slice(0, MAX_BOOKMARKS_PER_CATEGORY).forEach((bookmarkId, bmIndex) => {
          const bookmark = bookmarks.get(bookmarkId);
          if (bookmark) {
            const bmId = `${subId}-bm-${bmIndex}`;
            newNodes.push({
              id: bmId,
              data: { label: bookmark.title },
              position: { x: 0, y: 0 },
            });
            newEdges.push({
              id: `${subId}-${bmId}`,
              source: subId,
              target: bmId,
              type: 'smoothstep',
              markerEnd: { type: MarkerType.ArrowClosed },
            });
          }
        });

        // Add ellipsis node if there are more bookmarks
        if (subCategory.bookmarks.length > MAX_BOOKMARKS_PER_CATEGORY) {
          const ellipsisId = `${subId}-ellipsis`;
          newNodes.push({
            id: ellipsisId,
            data: { label: '...' },
            position: { x: 0, y: 0 },
          });
          newEdges.push({
            id: `${subId}-${ellipsisId}`,
            source: subId,
            target: ellipsisId,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        }
      });

      // Add a sample of bookmark nodes for main category
      category.bookmarks.slice(0, MAX_BOOKMARKS_PER_CATEGORY).forEach((bookmarkId, bmIndex) => {
        const bookmark = bookmarks.get(bookmarkId);
        if (bookmark) {
          const bmId = `${categoryId}-bm-${bmIndex}`;
          newNodes.push({
            id: bmId,
            data: { label: bookmark.title },
            position: { x: 0, y: 0 },
          });
          newEdges.push({
            id: `${categoryId}-${bmId}`,
            source: categoryId,
            target: bmId,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        }
      });

      // Add ellipsis node if there are more bookmarks in the main category
      if (category.bookmarks.length > MAX_BOOKMARKS_PER_CATEGORY) {
        const ellipsisId = `${categoryId}-ellipsis`;
        newNodes.push({
          id: ellipsisId,
          data: { label: '...' },
          position: { x: 0, y: 0 },
        });
        newEdges.push({
          id: `${categoryId}-${ellipsisId}`,
          source: categoryId,
          target: ellipsisId,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed },
        });
      }
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [structure, bookmarks, setNodes, setEdges]);

  useEffect(() => {
    convertToFlowElements();
  }, [convertToFlowElements]);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default BookmarkFlowChart;
```


表现得不错的 Excalidraw
```
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { BookmarkStructure, Bookmark } from '@/lib/types';
import dagre from '@dagrejs/dagre';
import { MainMenu } from '@excalidraw/excalidraw';

const Excalidraw = dynamic(
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  { ssr: false }
);


interface BookmarkFlowChartProps {
  structure: BookmarkStructure;
  bookmarks: Map<string, Bookmark>;
}

const MAX_BOOKMARKS_PER_CATEGORY = 1;
const NODE_WIDTH = 150;
const NODE_HEIGHT = 60;

const BookmarkFlowChart: React.FC<BookmarkFlowChartProps> = ({ structure, bookmarks }) => {
  const [isClient, setIsClient] = useState(false);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    setIsClient(true);
    const style = document.createElement('style');
    style.textContent = `
      .excalidraw .App-menu_top .Stack_horizontal {
        display: none !important;
      }
    `;
    document.head.append(style);
  }, []);

  const createNode = (id: string, text: string, x: number, y: number, backgroundColor: string): ExcalidrawElement[] => {
    return [
      {
        type: "rectangle",
        id: id,
        x: x,
        y: y,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        backgroundColor: backgroundColor,
        strokeColor: "#000000",
        fillStyle: "hachure",
        strokeWidth: 1,
        roughness: 1,
        opacity: 100,
        roundness: { type: 3 },
        seed: Math.floor(Math.random() * 1000),
        version: 1,
        versionNonce: 0,
        isDeleted: false,
        boundElements: null,
        updated: 1,
        link: null,
        locked: false,
      } as ExcalidrawElement,
      {
        type: "text",
        id: `text-${id}`,
        x: x + 10,
        y: y + 10,
        width: NODE_WIDTH - 20,
        height: NODE_HEIGHT - 20,
        text: text,
        fontSize: 16,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        baseline: 18,
        containerId: id,
        originalText: text,
        seed: Math.floor(Math.random() * 1000),
        version: 1,
        versionNonce: 0,
        isDeleted: false,
        boundElements: null,
        updated: 1,
        link: null,
        locked: false,
      } as ExcalidrawElement,
    ];
  };

  const CURVE_TENSION = 0.3; // Adjust this value to change the curve's "bulge"

  const createEdge = (
    id: string,
    startNode: { x: number; y: number; width: number; height: number },
    endNode: { x: number; y: number; width: number; height: number }
  ): ExcalidrawElement => {
    const [startX, startY] = calculateEdgePoint(startNode, endNode);
    const [endX, endY] = calculateEdgePoint(endNode, startNode);
    const [cp1x, cp1y, cp2x, cp2y] = calculateControlPoints(startX, startY, endX, endY);
  
    return {
      type: "line",
      id: id,
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "transparent",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: { type: 2 },
      seed: Math.floor(Math.random() * 1000),
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
      points: [
        [0, 0],
        [cp1x - startX, cp1y - startY],
        [cp2x - startX, cp2y - startY],
        [endX - startX, endY - startY]
      ],
      lastCommittedPoint: null,
      startBinding: null,
      endBinding: null,
      startArrowhead: null,
      endArrowhead: "arrow",
      frameId: null, // Add this line
    } as ExcalidrawElement;
  };
  
  const calculateEdgePoint = (
    sourceNode: { x: number; y: number; width: number; height: number },
    targetNode: { x: number; y: number; width: number; height: number }
  ): [number, number] => {
    const sourceCenter = {
      x: sourceNode.x + sourceNode.width / 2,
      y: sourceNode.y + sourceNode.height / 2
    };
    const targetCenter = {
      x: targetNode.x + targetNode.width / 2,
      y: targetNode.y + targetNode.height / 2
    };
  
    const angle = Math.atan2(targetCenter.y - sourceCenter.y, targetCenter.x - sourceCenter.x);
    
    return [
      sourceCenter.x + Math.cos(angle) * sourceNode.width / 2,
      sourceCenter.y + Math.sin(angle) * sourceNode.height / 2
    ];
  };
  
  const calculateControlPoints = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): [number, number, number, number] => {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate the unit vector
    const ux = dx / distance;
    const uy = dy / distance;
  
    // Calculate the control points
    const cp1x = startX + ux * distance * CURVE_TENSION;
    const cp1y = startY + uy * distance * CURVE_TENSION;
    const cp2x = endX - ux * distance * CURVE_TENSION;
    const cp2y = endY - uy * distance * CURVE_TENSION;
  
    return [cp1x, cp1y, cp2x, cp2y];
  };

  const convertToExcalidrawElements = useCallback(() => {
    const graph = new dagre.graphlib.Graph();
    graph.setDefaultEdgeLabel(() => ({}));
    graph.setGraph({ rankdir: 'LR', nodesep: 150, ranksep: 200, marginx: 20, marginy: 20 });

    const nodes: { [key: string]: { id: string, label: string, type: string } } = {};
    const edges: { source: string, target: string }[] = [];

    // Add root node
    nodes['root'] = { id: 'root', label: 'BOOKMARKS', type: 'root' };
    graph.setNode('root', { width: NODE_WIDTH, height: NODE_HEIGHT });

    Object.entries(structure).forEach(([categoryName, category], index) => {
      const categoryId = `category-${index}`;
      nodes[categoryId] = { id: categoryId, label: categoryName, type: 'category' };
      graph.setNode(categoryId, { width: NODE_WIDTH, height: NODE_HEIGHT });
      edges.push({ source: 'root', target: categoryId });

      Object.entries(category.subcategories || {}).forEach(([subName, subCategory], subIndex) => {
        const subId = `${categoryId}-sub-${subIndex}`;
        nodes[subId] = { id: subId, label: subName, type: 'subcategory' };
        graph.setNode(subId, { width: NODE_WIDTH, height: NODE_HEIGHT });
        edges.push({ source: categoryId, target: subId });

        subCategory.bookmarks.slice(0, MAX_BOOKMARKS_PER_CATEGORY).forEach((bookmarkId, bmIndex) => {
          const bookmark = bookmarks.get(bookmarkId);
          if (bookmark) {
            const bmId = `${subId}-bm-${bmIndex}`;
            nodes[bmId] = { id: bmId, label: bookmark.title, type: 'bookmark' };
            graph.setNode(bmId, { width: NODE_WIDTH, height: NODE_HEIGHT });
            edges.push({ source: subId, target: bmId });
          }
        });
      });

      category.bookmarks.slice(0, MAX_BOOKMARKS_PER_CATEGORY).forEach((bookmarkId, bmIndex) => {
        const bookmark = bookmarks.get(bookmarkId);
        if (bookmark) {
          const bmId = `${categoryId}-bm-${bmIndex}`;
          nodes[bmId] = { id: bmId, label: bookmark.title, type: 'bookmark' };
          graph.setNode(bmId, { width: NODE_WIDTH, height: NODE_HEIGHT });
          edges.push({ source: categoryId, target: bmId });
        }
      });
    });

    edges.forEach(edge => graph.setEdge(edge.source, edge.target));

    dagre.layout(graph);

    const newElements: ExcalidrawElement[] = [];

    Object.values(nodes).forEach(node => {
      const nodeWithPosition = graph.node(node.id);
      const backgroundColor = 
        node.type === 'root' ? '#ffeaa7' :
        node.type === 'category' ? '#81ecec' :
        node.type === 'subcategory' ? '#74b9ff' :
        '#ffeaa7';
      newElements.push(...createNode(node.id, node.label, nodeWithPosition.x, nodeWithPosition.y, backgroundColor));
    });

    edges.forEach(edge => {
      const sourceNode = graph.node(edge.source);
      const targetNode = graph.node(edge.target);
      newElements.push(createEdge(
        `edge-${edge.source}-${edge.target}`,
        { x: sourceNode.x, y: sourceNode.y, width: NODE_WIDTH, height: NODE_HEIGHT },
        { x: targetNode.x, y: targetNode.y, width: NODE_WIDTH, height: NODE_HEIGHT }
      ));
    });

    setElements(newElements);
  }, [structure, bookmarks]);

  useEffect(() => {
    convertToExcalidrawElements();
  }, [convertToExcalidrawElements]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: "800px", width: "100%" }}>
      <Excalidraw
        initialData={{
          elements: elements,
          appState: { 
            viewBackgroundColor: isDarkMode ? "#111111" : "#FFFFFF",
            currentItemFontFamily: 1,
            theme: isDarkMode ? "dark" : "light",
          },
        }}
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: false,
            clearCanvas: false,
            export: false,
            loadScene: false,
            saveAsImage: false,
            saveScene: false,
            theme: false,
          },
        }}
        viewModeEnabled={true}
        zenModeEnabled={true}
        gridModeEnabled={false}
      >
        {/* <MainMenu>

        </MainMenu> */}
        {
          <MainMenu>
          </MainMenu>
        }
      </Excalidraw>
    </div>
  );
};

export default BookmarkFlowChart;
```

## 
画布自定义

https://github.com/excalidraw/excalidraw/pull/6034

https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/children-components/main-menu
