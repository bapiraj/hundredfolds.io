---
title: "Building Sudoku AI in Python"
description: "A step by step approach to build a Sudoku AI Solver using backtracking"
datePublished: "2025-03-04"
dateModified: "2025-03-04"
---
# Building Sudoku AI in Python

Sudoku is a popular number puzzle game that consists of a 9×9 grid, divided into nine 3×3 subgrids. The objective is to fill the grid so that each row, each column, and each 3×3 subgrid contains the numbers 1 to 9 exactly once.

In this article, we will build a Sudoku AI Solver in Python using backtracking. We'll walk through the core functions of our solver step by step.


## Sudoku Rules Refresher

A valid Sudoku grid follows these rules:

1. Each **row** must contain the numbers 1 to 9 **without repetition**.
2. Each **column** must contain the numbers 1 to 9 **without repetition**.
3. Each **3×3 subgrid** must contain the numbers 1 to 9 **without repetition**.

Below is an example of a partially solved Sudoku board:

![Sudoku Grid](/images/sudoku-grid.png)

For example, let's check the highlighted cell:
- The row contains: `1,2,3,5,9`
- The column contains: `1,5,6`
- The subgrid contains: `1,4,5,6,7,9`

The only valid number for this cell, considering all constraints, is `8`.



## Defining the Sudoku Grid and Display Function

We represent the Sudoku board as a **2D list**. Empty cells are represented by `0`. We also define a `display()` function to print the board neatly.

```python
grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

def display(grid):
    for row in grid:
        print(','.join(map(str, row)))
```



## Checking if a Number is Valid

Before placing a number, we must ensure it does not violate Sudoku rules. The `is_valid()` function checks:

1. If the number already exists in the **row**.
2. If the number already exists in the **column**.
3. If the number already exists in the **3×3 subgrid**.

```python
def is_valid(grid, i, j, num):
    # Check ith row
    for col_index in range(9):
        if grid[i][col_index] == num:
            return False
    
    # Check jth column
    for row_index in range(9):
        if grid[row_index][j] == num:
            return False

    # Check 3x3 subgrid
    subgrid_row, subgrid_col = i // 3, j // 3
    for row_index in range(3 * subgrid_row, 3 * subgrid_row + 3):
        for col_index in range(3 * subgrid_col, 3 * subgrid_col + 3):
            if grid[row_index][col_index] == num:
                return False

    return True
```



## Solving Sudoku with Backtracking

The backtracking algorithm works by:
1. Finding an **empty cell** (`0`).
2. Trying numbers **1 to 9**.
3. Using `is_valid()` to check if the number is allowed.
4. Recursively attempting to solve the rest of the board.
5. **Backtracking** if a solution is not found.

```python
def solve(grid):
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                for num in range(1, 10):
                    if is_valid(grid, i, j, num):
                        grid[i][j] = num
                        if solve(grid):
                            return True
                        grid[i][j] = 0  # Backtrack
                return False  # No valid number found
    return True  # Solved
```



## Enhancing Readability with `display()`

To enhance readability, we add a slight delay using `time.sleep()` and clear the console with `os.system('clear')` for a smooth display effect.

```python
import os
import time

def display(grid):
    os.system('clear')  # Clears console for better readability
    for row in grid:
        print(','.join(map(str, row)))
    time.sleep(0.1)  # Add delay for visualization
```

We also modify the `solve()` function to call `display()` after each update:

```python
def solve(grid):
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                for num in range(1, 10):
                    if is_valid(grid, i, j, num):
                        grid[i][j] = num
                        display(grid)  # Show progress
                        if solve(grid):
                            return True
                        grid[i][j] = 0
                return False
    return True
```



## Running the Solver

Finally, we display the initial board, run the solver

```python
display(grid)
solve(grid)
```



## Try something out!

1. How many iterations does it take each time `solve(grid)` is called? Can we reduce the number of iterations? Try to do it without using ChatGPT
2. Try to build a web page supported by HTML, CSS and JS that solves a sudoku puzzle using backtracking. Try to use ChatGPT for this. Check this [Sudoku AI Playground](/playground/sudoku-ai) for reference