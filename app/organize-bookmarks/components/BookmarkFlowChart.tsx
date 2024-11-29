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

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}) => {
  const edgePath = `M${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`;
  return (
    <>
      <path
        id={id}
        style={{...style, strokeWidth: 2, stroke: '#b1b1b7'}}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <path
        style={{...style, strokeWidth: 1, stroke: '#999', strokeDasharray: '5,5'}}
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};


interface BookmarkFlowChartProps {
  structure: BookmarkStructure;
  bookmarks: Map<string, Bookmark>;
}

const MAX_BOOKMARKS_PER_CATEGORY = 1;

const nodeWidth = 180;
const nodeHeight = 40;

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