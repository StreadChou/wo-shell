<script setup lang="ts">

import { ref, computed } from "vue";

interface TreeNode {
  label: string;
  icon?: string;
  children?: TreeNode[];
  id?: string;
  level?: number;
}

const expandedNodes = ref<Set<string>>(new Set());

const treeData: TreeNode[] = [
  {
    label: '保存的文档(账号密码合集)',
    id: 'root',
    children: [
      {
        label: '链接列表',
        icon: 'folder',
        id: 'links',
        children: [
          {
            label: '物理机: 192.168.1.100',
            icon: 'folder',
            id: 'server-100',
            children: [
              { label: '物理机本身: 192.168.1.100', id: 'physical-100' },
              { label: '虚拟机1: 192.168.10.1', id: 'vm1-100' },
              { label: '虚拟机2: 192.168.10.2', id: 'vm2-100' },
            ]
          },
          { label: '物理机: 192.168.1.101', id: 'server-101' }
        ]
      },
      {
        label: '秘钥列表',
        icon: 'key',
        id: 'keys',
        children: [
          { label: 'Prompt attention', id: 'prompt' },
          { label: 'Professional waiter', id: 'waiter' }
        ]
      },
    ]
  }
];

const flattenTree = (nodes: TreeNode[], level = 0): TreeNode[] => {
  const result: TreeNode[] = [];
  nodes.forEach(node => {
    const nodeWithLevel = { ...node, level };
    result.push(nodeWithLevel);
    
    if (node.children && expandedNodes.value.has(node.id || '')) {
      result.push(...flattenTree(node.children, level + 1));
    }
  });
  return result;
};

const flattenedNodes = computed(() => flattenTree(treeData));

const toggleExpand = (node: TreeNode) => {
  if (!node.children || node.children.length === 0) return;
  
  const nodeId = node.id || '';
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId);
  } else {
    expandedNodes.value.add(nodeId);
  }
};

const isExpanded = (node: TreeNode) => {
  return expandedNodes.value.has(node.id || '');
};

const hasChildren = (node: TreeNode) => {
  return node.children && node.children.length > 0;
};

const getIcon = (node: TreeNode) => {
  if (node.icon) return node.icon;
  if (hasChildren(node)) return 'folder';
  return 'description';
};

</script>

<template>
  <div class="document-tree">
    <transition-group name="tree-item" tag="div">
      <div
        v-for="node in flattenedNodes"
        :key="node.id"
        class="tree-node"
        :class="{ 'has-children': hasChildren(node) }"
        :style="{ paddingLeft: `${node.level! * 16 + 8}px` }"
        @click="toggleExpand(node)"
      >
        <div class="node-content">
          <div 
            class="expand-icon" 
            v-if="hasChildren(node)"
            :class="{ 'expanded': isExpanded(node) }"
          >
            <q-icon
              name="chevron_right"
              size="16px"
            />
          </div>
          <div class="expand-icon" v-else></div>
          
          <q-icon
            :name="getIcon(node)"
            size="16px"
            class="node-icon"
          />
          
          <span class="node-label">{{ node.label }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.document-tree {
  font-size: 13px;
  color: #3c3c3c;
  user-select: none;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
}

.tree-node {
  cursor: pointer;
  border-radius: 0;
  transition: background-color 0.1s ease;
  min-height: 20px;
  display: flex;
  align-items: center;
}

.tree-node:hover {
  background-color: #e8e8e8;
}

.tree-node.has-children:hover {
  background-color: #d8d8d8;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 2px;
  width: 100%;
  padding: 1px 0;
}

.expand-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.node-icon {
  color: #888;
  flex-shrink: 0;
  margin-right: 4px;
}

.node-label {
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
  color: #333;
  font-weight: 400;
}

.tree-node[style*="paddingLeft: 8px"] .node-label {
  font-weight: 500;
}

.tree-node:active {
  background-color: #cce7ff;
}

.tree-item-enter-active,
.tree-item-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.tree-item-enter-from,
.tree-item-leave-to {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
}

.tree-item-enter-to,
.tree-item-leave-from {
  max-height: 20px;
  opacity: 1;
  transform: scaleY(1);
}
</style>
