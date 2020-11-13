---
title: 'On databases: B+ trees'
description: >-
    Since I have been busy with a new project for school and since it seems
    promising, let’s talk more about it! As can be guessed by the title it is a
    database. And as people might know B+ trees are one of the most important
    parts of a good database. Datastores, key-value stores, relational databases,
    graph databases all have a B+ tree or at least a B tree. These trees are data
    structures that are used to store and lookup key values within databases.
date: '2015-05-31T00:00:00+02:00'
tags:
    - Technical
    - Programming
---

## Trees?

But let’s begin at the beginning. Within computer science, a tree is a data structure containing nodes. Each node in the tree contain information and can refer to other nodes in the tree, these are known as children. Each node without child nodes is called a leaf node. When you draw this out with pen and paper and squeeze your eyes real close, you might see the tree-like structure in it (or you might need another beer).

## Soo B what?

Some people might confuse a B tree with a binary tree and those people are not far off. Binary trees have one key value per node and have two children. When looking up a value you start traversing the tree, beginning with the first node (which is known as the root node). If the value is smaller than the key of the node you take the left child, if it is larger you take the right child. When the lookup value matches the key of the node, that is the node you were looking for. This way value lookups in a balanced tree are only O(log n). Of course this can be made so that each node has one or multiple data items per key value.

The B tree on the other hand has not one key value per node but a predefined amount of sorted key values, known as the bucket size. This means that it also references more children nodes, in fact each node references maximal its bucket size plus one child. This whole bucket thing will however increase the steps it would take to lookup a value in the most optimal situation. So why not just use a binary tree, since that is theoretically faster? Well, with a binary tree you need to jump around in memory and this comes at a great cost, which is why B trees tend to perform better.

Moreover when implementing a B tree which also writes its nodes to disk, you save a lot of disk IO by clustering the keys and nodes. Each node means potentially another disk operation and those tend to be one of the slowest types of operations. One might ask: “If disk operations are that slow, why not add all keys to a single sorted list and iterative lookup the value?”. First off good question, but this does mean that you potentially need to iterate the whole list to find a key value and on top of that it means that the whole list needs to be in memory and mutating a large list is quite expensive. So it is important that a good balance is chosen between between disk IO and operations. Common bucket sizes are 64 keys, but this may vary based on the memory and cache size of a system. Ideally you want a whole bucket to fit in your cache.

## There was a + right?

So how does a B+ differ from a B tree? Well a B tree and binary tree have the values which correspond to the key value of the node in the node itself. B+ trees on the other hand store all the values in the leaf nodes. This has as benefit that deleting and inserting is a bit easier and on top of that, when the leaf nodes reference their neighboring leaf nodes, iterating over all values will be faster.

## Why?

To understand why, let me give a little example. Given we have a document store, where we have n documents. These documents need to be stored and filed such that we can refer to a document by an identifier so that we have easy access to that document. In this example the identifier is our key and the document is our value, when we create a B+ tree of these documents we can delete, insert and find documents with relative ease. The problem using other structures as hashmaps is that these structures are not as dense as B+ trees. More over, dynamically growing hashmaps becomes quite expensive very fast and let’s not start about the trouble one will get into when trying to create a disk based hashmap.

## Advanced topics

Now we know what a B+ tree is, let’s start looking into how lookups, inserts and deletions are performed.

## Key Selection

The easiest of the three are the lookups. As mentioned before, in order to find a given key in a given B+ tree we need to traverse the tree starting with the root node. However when comparing the given lookup key with the keys in the bucket, when do we decide to go to the node of that key? Let me first note that there are multiple ways to do this, but I will explain and use the following rule. For every key in the bucket you compare it with the keys in the bucket and you choose the first node where the key in the bucket is bigger than the lookup key. When every key in the bucket is smaller than the lookup key, the last node is taken.

This is done recursively until a leaf node is found, where the data item belonging to the given lookup key is returned.

## Insertion

The initial insert of a given data item and key is fairly easy. First the leaf node which will hold the key and data item must be found, this is done with the previously mentioned key selection algorithm. Next the key is inserted in the bucket at the appropriate place within the bucket. If the bucket is full after the insertion, the node is split where one node has the lower half and one node the upper half of the keys. Now the newly created node must be inserted in the parental node and if needed that node can be split as well.

## Deletion

The hardest algorithm is deletion, in fact this is such a pain to implement that most B+ tree implementation use a small trick to do this. Upon deleting an item, mark the key as invalid and after a defined amount of deletions rebuild the complete tree from ground up. This seems insanely slow, but in fact the amortized complexity is the same.

## Bulk insert

Building a complete B+ tree given a sorted set of key-value pairs is quite simple to do. Start by dividing the sorted key value pairs in parts such that each part fills a bucket, but leave one space empty for a future insert. Create leaf nodes for every part and fill the buckets with the given data.

Now our new dataset consists of the leaf nodes containing our key value pairs, now nodes can be created where each key is the highest value in our leaf node’s bucket. This continues until we end up with just one node.

## To conclude

This concludes the B+ trees, as example one might look at HybreDb – B+ tree. HybreDb is the project I talked about at the beginning of this post and it does implement the above described B+ tree. Only the deletion I used is a bit more complicated as well as the disk based B+ tree, which allows the whole tree to be written to file and all changes are appended to a file.
