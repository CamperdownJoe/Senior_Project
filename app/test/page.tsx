'use client';

import { useState } from 'react';
const NBFFConverter = require('nbff-converter');


const bookmarkHtml = `
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
			<DT><A HREF="https://www.edx.org/" ADD_DATE="1611583020">edXQ</A>
            <DT><A HREF="https://www.bbc.com/news" ADD_DATE="1611582000">BBC News</A>
            <DT><A HREF="https://www.nytimes.com/" ADD_DATE="1611582010">The New York Times</A>
        </DL><p>
        <DT><H3 ADD_DATE="1611576972" LAST_MODIFIED="1624701245">Learning</H3>
        <DL><p>
            <DT><A HREF="https://www.coursera.org/" ADD_DATE="1611583000">Coursera</A>
            <DT><A HREF="https://www.edx.org/" ADD_DATE="1611583000">edX</A>
			<DT><A HREF="https://www.it610.com/article/1280833691202895872.htm" ADD_DATE="1611583020">edXRR</A>
			<DT><A HREF="http://www.sijing233.com/h-nd-20.html#_np=2_620" ADD_DATE="1611583020">edXRR</A>
        </DL><p>
    </DL><p>
    <DT><A HREF="https://www.edx.org/" ADD_DATE="1611583010">edXC</A>
	<DT><A HREF="https://www.edx.org/" ADD_DATE="1611583020">edXZ</A>

	
	
</DL><p>

`;

export default function OrganizeBookmarksPage() {
  const [result, setResult] = useState<string>('');

  const handleConversion = async () => {
    try {
      const converter = new NBFFConverter();

      const jsonResult = await converter.netscapeToJSON(bookmarkHtml);

      setResult(JSON.stringify(jsonResult, null, 2));
    } catch (error) {
      console.error('Error converting bookmarks:', error);
      setResult('Error converting bookmarks');
    }
  };

  return (
    <div>
      <h1>Organize Bookmarks</h1>
      <button onClick={handleConversion}>Convert Bookmarks</button>
      {result && (
        <pre>
          <code>{result}</code>
        </pre>
      )}
    </div>
  );
}