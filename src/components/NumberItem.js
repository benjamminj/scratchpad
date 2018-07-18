import React from 'react'
import { css } from 'emotion'
import { fontMono } from '../styles/variables'

/**
 * NumberItem
 * Intended to be used within the sorting visualizations.
 * Pretty light component, all it does it add some styles to a list item
 */
export const NumberItem = ({
  item,
  isCurrent,
  isPrimaryCounter,
  isSecondaryCounter,
}) => (
  <li
    className={css`
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      font-family: ${fontMono};
    `}
  >
    <span
      className={css`
        text-decoration: ${isCurrent || isPrimaryCounter
          ? 'underline'
          : 'none'};
      `}
    >
      {item}
    </span>
    <span
      className={css`
        line-height: 1;
        font-size: 0.75rem;
      `}
    >
      {isSecondaryCounter && '^'}
    </span>
  </li>
)
