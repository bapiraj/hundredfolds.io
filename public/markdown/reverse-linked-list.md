---
title: "Reversing a linked list"
description: "A guide to DSA"
datePublished: "2025-03-02"
dateModified: "2025-03-02"
---

# Reverse a Linked List in Python

Reversing a linked list is a common problem in coding interviews. Here's how it's done in Python.

### **Solution**
The idea is to use three pointers: `prev`, `current`, and `next`.

```python
class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def reverse_linked_list(head):
    prev = None
    while head:
        next_node = head.next
        head.next = prev
        prev = head
        head = next_node
    return prev
```

### **Solution**
The idea is to use three pointers: `prev`, `current`, and `next`.

```python
print("Hello World")
```