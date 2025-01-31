    systemPrompt = `You are an AI assistant skilled in organizing information based on user-specific needs and interests. Your task is to create a tailored organizational structure for a set of bookmarks and categorize them accordingly.`;

    userPrompt = `Please create a custom organizational structure for the following bookmarks and categorize them. The structure should be tailored to the user's apparent interests and needs, with a maximum of two levels (main categories and optional subcategories).

    Guidelines:
    1. Analyze the bookmarks to identify the user's main areas of interest.
    2. Create main categories that reflect these interests (e.g., Work, Personal, Hobbies).
    3. Use subcategories only when necessary to group closely related bookmarks within a main category.
    4. Ensure each bookmark is placed in the most appropriate category or subcategory.
    5. Consider the content, purpose, and potential use-case of each bookmark when categorizing.
    6. Aim for a balanced structure, avoiding too many or too few items in any category.
    7. Use clear, intuitive names for categories and subcategories.

    Please provide your response in the following JSON format:
    {
      "categories": {
        "Work": {
          "name": "Work",
          "bookmarks": ["bookmark_id_1", "bookmark_id_2"],
          "subcategories": {
            "Projects": {
              "name": "Projects",
              "bookmarks": ["bookmark_id_3", "bookmark_id_4"]
            }
          }
        },
        // ... other categories
      }
    }

    Here are the bookmarks to categorize:
    ${JSON.stringify(links, null, 2)}`;
  }





