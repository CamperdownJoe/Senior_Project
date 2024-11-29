"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

const BookmarkStructureVisualization: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Add CSS to hide the menu button
    const style = document.createElement('style');
    style.textContent = `
      .excalidraw .App-menu_top .Stack_horizontal {
        display: none !important;
      }
    `;
    document.head.append(style);
  }, []);

  const elements: ExcalidrawElement[] = [
    // Node 1
    {
      type: "rectangle",
      id: "node1",
      x: 100,
      y: 100,
      width: 150,
      height: 60,
      backgroundColor: "#ffeaa7",
      strokeColor: "#000000",
      fillStyle: "hachure",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      roundness: { type: 3 },
      seed: 1,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Node 1 Text
    {
      type: "text",
      id: "text1",
      x: 110,
      y: 120,
      width: 130,
      height: 20,
      text: "Node 1",
      fontSize: 16,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: "node1",
      originalText: "Node 1",
      seed: 2,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Node 2
    {
      type: "rectangle",
      id: "node2",
      x: 300,
      y: 50,
      width: 150,
      height: 60,
      backgroundColor: "#ffeaa7",
      strokeColor: "#000000",
      fillStyle: "hachure",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      roundness: { type: 3 },
      seed: 3,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Node 2 Text
    {
      type: "text",
      id: "text2",
      x: 310,
      y: 70,
      width: 130,
      height: 20,
      text: "Node 2",
      fontSize: 16,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: "node2",
      originalText: "Node 2",
      seed: 4,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Node 3
    {
      type: "rectangle",
      id: "node3",
      x: 300,
      y: 150,
      width: 150,
      height: 60,
      backgroundColor: "#ffeaa7",
      strokeColor: "#000000",
      fillStyle: "hachure",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      roundness: { type: 3 },
      seed: 5,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Node 3 Text
    {
      type: "text",
      id: "text3",
      x: 310,
      y: 170,
      width: 130,
      height: 20,
      text: "Node 3",
      fontSize: 16,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: "node3",
      originalText: "Node 3",
      seed: 6,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
    } as ExcalidrawElement,
    // Edge 1 (Node 1 to Node 2)
    {
      type: "arrow",
      id: "edge1",
      x: 250,
      y: 130,
      width: 50,
      height: 50,
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
      seed: 7,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
      points: [[0, 0], [50, -50]],
      lastCommittedPoint: null,
      startBinding: { elementId: "node1", focus: 0, gap: 1 },
      endBinding: { elementId: "node2", focus: 0, gap: 1 },
      startArrowhead: null,
      endArrowhead: "arrow",
      frameId: "Asc"
    } as ExcalidrawElement,
    // Edge 2 (Node 1 to Node 3)
    {
      frameId: "Ascc", 
      type: "arrow",
      id: "edge2",
      x: 250,
      y: 130,
      width: 50,
      height: 50,
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
      seed: 8,
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
      points: [[0, 0], [50, 50]],
      lastCommittedPoint: null,
      startBinding: { elementId: "node1", focus: 0, gap: 1 },
      endBinding: { elementId: "node3", focus: 0, gap: 1 },
      startArrowhead: null,
      endArrowhead: "arrow",
    } as ExcalidrawElement,
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Excalidraw
        initialData={{
          elements: elements,
          appState: { 
            viewBackgroundColor: "#FFFFFF",
            currentItemFontFamily: 1,
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
      />
    </div>
  );
};

export default BookmarkStructureVisualization;