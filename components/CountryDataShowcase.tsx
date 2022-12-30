import { FC } from "react"
import { Trans } from "react-i18next"
import { CountryData, YearInReviewAuthor, YearInReviewBook, YearInReviewQuote, YearInReviewShelf } from "types/data"

const getReducedNumber = (number: number): string => {
  const metrics = ['', 'K', 'M']

  const power = number.toExponential()?.split(/e/).pop()
  const rank = Math.floor(Number(power) / 3)
  let value = Number((number / Math.pow(10, rank * 3)).toFixed(1))

  if ((value * 10) % 10 === 0) {
    value = Math.round(value)
  }
  return value + metrics[rank]
}

const urlHelper = {
  book: (uuid: string) => `/mock/book/${uuid}`,
  author: (uuid: string) => `/mock/author/${uuid}`,
  shelf: (uuid: string) => `/mock/shelf/${uuid}`,
}

const YearInReviewAuthorSample = ({
  author,
  index,
}: {
  author: YearInReviewAuthor
  index: number
}) => (
  <li className="year-in-review_author">
    {index + 1}

    <a href={urlHelper.author(author.uuid)} target="_blank">
      <img className="author-image" src="author.cover" alt={author.name} />
    </a>
    <a
      className="author-link"
      href={urlHelper.author(author.uuid)}
      target="_blank"
    >
      {author.name || author.author_name}
    </a>

    <div className="country-item__footer">
      {author.works_count > 0 ? (
        <span className="country-item__footer_group">
          📘
          <span className="country-item__footer_label">
            {author.works_count}
          </span>
        </span>
      ) : null}
      {author.readers_count > 0 ? (
        <span className="country-item__footer_group">
          👱
          <span className="country-item__footer_label">
            {getReducedNumber(author.readers_count)}
          </span>
        </span>
      ) : null}
    </div>
  </li>
)

const YearInReviewShelfSample = ({
  shelf,
  index,
}: {
  shelf: YearInReviewShelf
  index: number
}) => (
  <a
    className="year-in-review_shelf-link"
    href={urlHelper.shelf(shelf.uuid)}
    target="_blank"
  >
    <li className="year-in-review_shelf">
      {index}
      <div className="shelf-card__cover">
        {shelf.covers.map((cover, coverIndex) => (
          <img
            className={`cover-item${cover.type === 'audiobook' ? ' audiobook' : ''
              }`}
            src={cover.src}
            key={coverIndex}
          />
        ))}
      </div>
      {shelf.title}
      <div className="country-item__footer">
        {shelf.books_count > 0 ? (
          <span className="country-item__footer_group">
            📘
            <span className="country-item__footer_label">
              {getReducedNumber(shelf.books_count)}
            </span>
          </span>
        ) : null}
        {shelf.readers_count > 0 ? (
          <span className="country-item__footer_group">
            👱
            <span className="country-item__footer_label">
              {getReducedNumber(shelf.readers_count)}
            </span>
          </span>
        ) : null}
      </div>
    </li>
  </a>
)

const YearInReviewBookSample = ({
  book,
  index,
  children,
}: {
  book: YearInReviewBook
  index?: number
  children?: JSX.Element
}) => (
  <li className="year-in-review_book">
    {children}
    {index}
    <a href={urlHelper.book(book.uuid)} target="_blank">
      <img
        className="year-in-review_book__cover"
        src={book.cover}
        alt={book.title || book.name}
      />
    </a>
    <div className="book-author">
      {book.authors.map((author, authorIndex) => (
        <span key={`author-${index}`}>
          <a href={urlHelper.author(author.uuid)} target="_blank">
            {author.name}
          </a>
          {authorIndex < book.authors.length - 1 && ', '}
        </span>
      ))}
      <a href={urlHelper.book(book.uuid)} target="_blank">
        {book.title || book.name}
      </a>
    </div>
    <div className="country-item__footer">
      {book.readers_count > 0 ? (
        <div className="country-item__footer_group">
          👱
          <span className="country-item__footer_label">
            {getReducedNumber(book.readers_count)}
          </span>
        </div>
      ) : null}
      {book.quotes_count > 0 ? (
        <div className="country-item__footer_group">
          🔖
          <span className="country-item__footer_label">
            {getReducedNumber(book.quotes_count)}
          </span>
        </div>
      ) : null}
      {book.impressions_count > 0 ? (
        <div className="country-item__footer_group">
          📢
          <span className="country-item__footer_label">
            {getReducedNumber(book.impressions_count)}
          </span>
        </div>
      ) : null}
    </div>
  </li>
)

const YearInReviewQuoteSample = ({
  quote,
  index,
  hideLikes,
}: {
  quote: YearInReviewQuote
  index?: number
  hideLikes?: boolean
}) => (
  <li className="year-in-review_quote">
    {index && <div className="year-in-review_quote__heading">{index}</div>}
    <div
      className="year-in-review_quote__body"
      dangerouslySetInnerHTML={{ __html: quote.text }}
    />

    <div className="year-in-review_quote__book">
      {quote.authors.map((author, authorIndex) => (
        <span key={`quote-author-${index}`}>
          <a href={urlHelper.author(author.uuid)} target="_blank">
            {author.name}
          </a>
          {authorIndex < quote.authors.length - 1 && ', '}
        </span>
      ))}
      <br />
      <a href={urlHelper.book(quote.book.uuid)} target="_blank">
        {quote.book.title}
      </a>
    </div>
    {!hideLikes ? (
      <div className="year-in-review_quote__likes">
        ❤︎
        {getReducedNumber(quote.likes_count)}
      </div>
    ) : null}
  </li>
)

const monthIndicesToLocaleIds = {
  1: 'full_date_jan',
  2: 'full_date_feb',
  3: 'full_date_mar',
  4: 'full_date_apr',
  5: 'full_date_may',
  6: 'full_date_jun',
  7: 'full_date_jul',
  8: 'full_date_aug',
  9: 'full_date_sep',
  10: 'full_date_oct',
  11: 'full_date_nov',
  12: 'full_date_dec',
}

type Props = {
  country: CountryData
  userCountry: string
  auth: boolean
  setAuth: (value: boolean) => void
}

export const YearInReviewGeneralData: FC<Props> = ({
  country,
  userCountry,
  auth,
  setAuth,
}): JSX.Element => (
  <section className="bookmate-2022__general_data">
    {country.quotes.length && userCountry !== 'dk' ? (
      <>
        <article className="bookmate-2022__general_quotes">
          <h2>
            <Trans
              id="year-in-review.subh2_quotes"
              values={{
                country: (
                  <span className="accented">
                    <Trans
                      id={`countries_locative.${userCountry}`}
                    />
                  </span>
                ),
              }}
            />
          </h2>
          <div className="horizontal-scroller">
            <ul className="country-items__list">
              {country.quotes.map((quote, index) => (
                <YearInReviewQuoteSample
                  key={`quote-${index}`}
                  quote={quote}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </article>
      </>
    ) : null}
    {country.authors.length ? (
      <article className="bookmate-2022__general_authors">
        <h2>
          <Trans
            i18nKey="subheading_authors"
            values={{
              country: (
                <span className="accented">
                  <Trans
                    id={`countries_locative.${userCountry}`}
                  />
                </span>
              ),
            }}
          />
        </h2>
        {/** @ts-ignore **/}
        <Trans i18nKey="authors_lead_in" />
        <div className="horizontal-scroller">
          <ul className="country-items__list">
            {country.authors.map((author, index) => (
              <YearInReviewAuthorSample
                key={`author-${index}`}
                author={author}
                index={index}
              />
            ))}
          </ul>
        </div>
      </article>
    ) : null}
    {country.books.length ? (
      <>
        <article className="bookmate-2022__general_books">
          <h2>
            <Trans
              id="year-in-review.subh2_books"
              values={{
                country: (
                  <span className="accented">
                    <Trans
                      id={`countries_locative.${userCountry}`}/>
                  </span>
                ),
              }}
            />
          </h2>
          <Trans i18nKey="books_lead_in" />
          <div className="horizontal-scroller">
            <ul className="country-items__list">
              {country.books.map((book, index) => (
                <YearInReviewBookSample
                  key={`book-${index}`}
                  book={book}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </article>

      </>
    ) : null}
    {country.shelves.length && userCountry !== 'rs' ? (
      <>
        <article className="bookmate-2022__general_shelves">
          <h2>
            <Trans
              id="year-in-review.subh2_shelves"
              values={{
                country: (
                  <span className="accented">
                    <Trans
                      id={`countries_locative.${userCountry}`}
                    />
                  </span>
                ),
              }}
            />
          </h2>
          <Trans i18nKey="shelves_lead_in" />
          <div className="horizontal-scroller">
            <ul className="country-items__list">
              {country.shelves.map((shelf, index) => (
                <YearInReviewShelfSample
                  key={`shelf-${index}`}
                  shelf={shelf}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </article>
      </>
    ) : null}
    {country.most_read_month.length ? (
      <>
        <article className="bookmate-2022__general_month">
          <h2>
            <Trans
              id="year-in-review.subh2_month_read"
              values={{
                country: (
                  <span className="accented">
                    <Trans
                      id={`countries_locative.${userCountry}`}
                    />
                  </span>
                ),
              }}
            />
          </h2>
          <ul className="country-items__list">
            {country.most_read_month.map(month => <li className="most-read-month">
              <Trans
                // @ts-ignore
                i18nKey={monthIndicesToLocaleIds[month]}
              />
            </li>)}
          </ul>
        </article>
      </>
    ) : null}
    <div
      className={`year-in-review__banner${auth ? ' banner-uncaptioned' : ''
        }`}
    >
      <h3>
        <Trans
          id="year-in-review.you_bookmate_2022"
          components={[<span />]}
        />
      </h3>
      <p>
        <Trans i18nKey="banner_desc" />
      </p>
      {!auth && (
        <>
          <p>
            <Trans i18nKey="banner_hint" />
          </p>
          <button onClick={() => setAuth(true)}><Trans i18nKey="login" /></button>
        </>
      )}
      <img
        className="banner__decor"
        src="https://a.bmstatic.com/iu/74/195/Frame 12-0c853f5eaacd5c68ca28c2ce3469a24c.svg"
        alt="decor"
      />
    </div>
    {!auth ? <div className="black-padding" /> : null}
  </section>
)
