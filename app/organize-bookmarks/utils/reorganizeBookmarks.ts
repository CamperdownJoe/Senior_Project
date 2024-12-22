import { Bookmark, BookmarkMap, BookmarkStructure, BookmarkCategory } from '@/lib/types';
import { fetchAIRecommendation } from './fetchAIRecommendation';

interface SeparatedBookmarks {
  folders: Bookmark[];
  links: Bookmark[];
}

function separateBookmarks(bookmarks: BookmarkMap): SeparatedBookmarks {
  const folders: Bookmark[] = [];
  const links: Bookmark[] = [];

  bookmarks.forEach((bookmark) => {
    if (bookmark.type === 'folder') {
      folders.push(bookmark);
    } else {
      links.push(bookmark);
    }
  });

  return { folders, links };
}


function processAIResponse(aiResponse: any): BookmarkStructure {
  const processedStructure: BookmarkStructure = {};

  function processCategory(category: any): BookmarkCategory {
    const processedCategory: BookmarkCategory = {
      name: category.name,
      bookmarks: category.bookmarks || [],
    };

    if (category.subcategories) {
      processedCategory.subcategories = {};
      for (const [subKey, subCategory] of Object.entries(category.subcategories)) {
        processedCategory.subcategories[subKey] = processCategory(subCategory);
      }
    }

    return processedCategory;
  }

  if (aiResponse.categories) {
    for (const [key, category] of Object.entries(aiResponse.categories)) {
      processedStructure[key] = processCategory(category);
    }
  } else {
    // 如果 AI 直接返回了顶级类别而不是嵌套在 "categories" 中
    for (const [key, category] of Object.entries(aiResponse)) {
      processedStructure[key] = processCategory(category);
    }
  }

  return processedStructure;
}

export async function reorganizeBookmarks(bookmarks: BookmarkMap, method: 'dewey' | 'ai'): Promise<BookmarkStructure> {
  // const bookmarkList = Array.from(bookmarks.values());
  const { folders, links } = separateBookmarks(bookmarks);


  let systemPrompt: string;
  let userPrompt: string;

  if (method === 'dewey') {
    systemPrompt = `You are an expert librarian skilled in the Dewey Decimal Classification system and in organizing digital content. Your task is to categorize a set of bookmarks using a simplified version of the Dewey Decimal system, creating a structure with 1-2 levels maximum.`;

    userPrompt = `Please categorize the following bookmarks using a simplified Dewey Decimal Classification system. Create a structure with a maximum of two levels. For each main category, you can have bookmarks directly under it or create subcategories if needed. 

    Guidelines:
    1. Use broad Dewey Decimal main categories (e.g., 000 - General Knowledge, 100 - Philosophy & Psychology).
    2. Create subcategories only when necessary to group related bookmarks.
    3. Ensure each bookmark is placed in the most appropriate category or subcategory.
    4. Consider the content and purpose of each bookmark when categorizing.
    5. Aim for a balanced structure, avoiding too many or too few items in any category.

    Please provide your response in the following JSON format:
    {
      "categories": {
        "000 - General Knowledge": {
          "name": "000 - General Knowledge",
          "bookmarks": ["bookmark_id_1", "bookmark_id_2"],
          "subcategories": {
            "Web Development": {
              "name": "Web Development",
              "bookmarks": ["bookmark_id_3", "bookmark_id_4"]
            }
          }
        },
        // ... other categories
      }
    }

    Here are the bookmarks to categorize:
    ${JSON.stringify(links, null, 2)}`;
  } else {
    systemPrompt = `You are an intelligent bookmark categorization assistant that can analyze the bookmarks provided by the user, examining each bookmark's content, title, URL, and added date. Based on a comprehensive assessment of the user's interests, profession, and characteristics, you will create a suitable categorization system.
    Please follow these steps:

    1. **User Analysis:**
      - Analyze all bookmarks to identify the user's main areas of interest, profession, hobbies, and traits.
      - Determine the possible identity of the user (e.g., student, programmer, designer, financial professional, etc.).

    2. **Create Categorization System:**
    - Based on the analysis, establish a categorization system that includes **general categories** and **customized categories**.
     - **General Categories:** Should include common categories that are suitable for most users, such as: Work, Study, Entertainment, Technology, Travel, Food, Photography, etc.
     - **Customized Categories:** These should only be created if there is strong evidence that the user has a deep interest in specific topics. They should be few in number and niche, tailored exclusively to the user, such as: "Pokemon," "AAA Games," "Korean Celebrities," etc.

     - The categorization system should have a hierarchical structure (with up to two levels), but should not be too deep to ensure easy browsing and management.
     - Ensure that the categorization system covers all bookmarks, and each bookmark is assigned to the most appropriate category.

    3. **Bookmark Categorization:**
      - Assign each bookmark to the most suitable single category.
      - **In the output, each bookmark should include the following information:**
        - **id:** A unique identifier for the bookmark (e.g., serial number or bookmark ID).
        - **title:** The title of the bookmark.

    4. **Output Result:**
      - Output the complete categorization results in JSON format, as follows:
        
        {
          "categories": {
            "Category1": {
              "name": "Category1",
              "bookmarks": [
                {
                  "id": "bookmark_id_1",
                  "title": "Bookmark Title 1",
                }
                // ... more bookmarks
              ],
              "subcategories": {
                "Subcategory1": {
                  "name": "Subcategory1",
                  "bookmarks": [
                    {
                      "id": "bookmark_id_2",
                      "title": "Bookmark Title 2",
                    }
                    // ... more bookmarks
                  ]
                }
                // ... more subcategories
              }
            },
            // ... more categories
          }
        }
        
      - **Note:**
        - Ensure that complete information for each bookmark is included in the output.
        - Category names and subcategory names should clearly and accurately reflect the content of the bookmarks within.
        - **Do not omit any bookmarks, regardless of their content.** All bookmarks provided by the user must be included in the categorization.

    5. **Other Requirements:**
      - The categorization system should be easy for the user to understand and use, avoiding overly complex or technical terms.
      - Do not include unsolicited information in the response, and directly output the JSON result.

    `;

    userPrompt = `Please categorize the following bookmarks according to the guidelines provided.

    Here are the bookmarks to categorize:
    ${JSON.stringify(links, null, 2)}`;
  }

  const aiResponse = await fetchAIRecommendation(links, 'categorize', systemPrompt, userPrompt);

  // we should conver tht response to correct format: BookmarkStructure
  // return aiResponse.categories;

  console.log(aiResponse);
  console.log(aiResponse.categories);
  console.log(processAIResponse(aiResponse.categories));
  return processAIResponse(aiResponse.categories);
}