import {defineStore, acceptHMRUpdate} from 'pinia';
import {ref, computed} from 'vue';

export interface TreeNode {
  label: string;
  icon?: string;
  children?: TreeNode[];
  id?: string;
  level?: number;
}

export interface Document {
  id: string;
  name: string;
  treeData: TreeNode[];
}

export const useDocumentsStore = defineStore('documents', () => {
  // 搜索输入值
  const searchQuery = ref('');

  // 所有文档数组
  const documents = ref<Document[]>([
    {
      id: 'doc1',
      name: '保存的文档(账号密码合集)',
      treeData: [
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
                    {label: '物理机本身: 192.168.1.100', id: 'physical-100'},
                    {label: '虚拟机1: 192.168.10.1', id: 'vm1-100'},
                    {label: '虚拟机2: 192.168.10.2', id: 'vm2-100'},
                  ]
                },
                {label: '物理机: 192.168.1.101', id: 'server-101'}
              ]
            },
            {
              label: '秘钥列表',
              icon: 'key',
              id: 'keys',
              children: [
                {label: '通用密码_root', id: 'prompt'},
                {label: '通用密码_admin', id: 'waiter'},
                {label: '项目A通用秘钥', id: 'waiter'},
              ]
            },
          ]
        }
      ]
    }
  ]);

  // 展开状态管理
  const expandedNodes = ref<Set<string>>(new Set());

  // 搜索过滤后的文档
  const filteredDocuments = computed(() => {
    if (!searchQuery.value.trim()) {
      return documents.value;
    }

    const query = searchQuery.value.toLowerCase();
    return documents.value.map(doc => {
      // 如果文档名匹配，返回整个文档
      if (doc.name.toLowerCase().includes(query)) {
        return doc;
      }

      // 否则过滤树数据
      const filteredTreeData = filterTreeData(doc.treeData, query);
      if (filteredTreeData.length > 0) {
        return {
          ...doc,
          treeData: filteredTreeData
        };
      }

      return null;
    }).filter(Boolean) as Document[];
  });

  // 过滤树数据
  const filterTreeData = (nodes: TreeNode[], query: string): TreeNode[] => {
    const result: TreeNode[] = [];

    for (const node of nodes) {
      const nodeMatches = node.label.toLowerCase().includes(query);
      let childMatches: TreeNode[] = [];

      if (node.children) {
        childMatches = filterTreeData(node.children, query);
      }

      // 如果节点本身匹配或有子节点匹配，则包含该节点
      if (nodeMatches || childMatches.length > 0) {
        result.push({
          ...node,
          children: childMatches.length > 0 ? childMatches : node.children
        });

        // 自动展开包含搜索结果的节点
        if (childMatches.length > 0 && node.id) {
          expandedNodes.value.add(node.id);
        }
      }
    }

    return result;
  };

  // 扁平化树结构
  const flattenTree = (nodes: TreeNode[], level = 0): TreeNode[] => {
    const result: TreeNode[] = [];
    nodes.forEach(node => {
      const nodeWithLevel = {...node, level};
      result.push(nodeWithLevel);

      if (node.children && expandedNodes.value.has(node.id || '')) {
        result.push(...flattenTree(node.children, level + 1));
      }
    });
    return result;
  };

  // 切换节点展开状态
  const toggleExpand = (node: TreeNode) => {
    if (!node.children || node.children.length === 0) return;

    const nodeId = node.id || '';
    if (expandedNodes.value.has(nodeId)) {
      expandedNodes.value.delete(nodeId);
    } else {
      expandedNodes.value.add(nodeId);
    }
  };

  // 检查节点是否展开
  const isExpanded = (node: TreeNode) => {
    return expandedNodes.value.has(node.id || '');
  };

  // 检查节点是否有子节点
  const hasChildren = (node: TreeNode) => {
    return node.children && node.children.length > 0;
  };

  // 获取节点图标
  const getIcon = (node: TreeNode) => {
    if (node.icon) return node.icon;
    if (hasChildren(node)) return 'folder';
    return 'description';
  };

  // 添加新文档
  const addDocument = (doc: Document) => {
    documents.value.push(doc);
  };

  // 删除文档
  const removeDocument = (id: string) => {
    const index = documents.value.findIndex(doc => doc.id === id);
    if (index > -1) {
      documents.value.splice(index, 1);
    }
  };

  // 清除搜索
  const clearSearch = () => {
    searchQuery.value = '';
  };

  // 重置展开状态
  const resetExpandedNodes = () => {
    expandedNodes.value.clear();
  };

  return {
    searchQuery,
    documents,
    expandedNodes,
    filteredDocuments,
    flattenTree,
    toggleExpand,
    isExpanded,
    hasChildren,
    getIcon,
    addDocument,
    removeDocument,
    clearSearch,
    resetExpandedNodes
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDocumentsStore, import.meta.hot));
}
