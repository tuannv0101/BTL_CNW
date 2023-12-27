-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2023 at 04:17 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food`
--

-- --------------------------------------------------------

--
-- Table structure for table `cook`
--

CREATE TABLE `cook` (
  `id` bigint(20) NOT NULL,
  `idRecipe` bigint(20) NOT NULL,
  `state` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `idUser` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cook`
--

INSERT INTO `cook` (`id`, `idRecipe`, `state`, `date`, `idUser`) VALUES
(3, 6, 0, '2023-07-16', 1),
(4, 6, 0, '2023-07-16', 1),
(5, 6, 1, '2023-07-16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `createdByAdmin` smallint(6) NOT NULL,
  `image` longtext NOT NULL,
  `idUser` bigint(20) DEFAULT NULL,
  `type` smallint(6) NOT NULL,
  `isDeleted` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `unit`, `createdByAdmin`, `image`, `idUser`, `type`, `isDeleted`) VALUES
(1, 'Cà chua', 'quả', 0, 'data:image/jpeg;base64,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', 1, 0, 0),
(2, 'Trứng gà', 'quả', 0, 'data:image/jpeg;base64,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', 1, 0, 0),
(3, 'Gà luộc', 'con', 0, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgVFRUZGRgaGh0dGhsbGh0aHR0dGxsZGxodHRsbIi0kHSApIBoaJTcpKS4wNDQ0GiM5PzkxPi0yNDABCwsLEA8QHhISHjIpJCsyMjUyMjUyMjI1MjIyMjIyMjI1MjIyMjUyMjIyMjIyMjIyMjIyMjUyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABEEAABAgMFBQUGAggFBAMAAAABAhEAAyEEEjFBUQUiYXGBBhMykaFCUrHB0fBikgcUFSNyouHxM0OCssIWRFPSJDTi/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EACwRAAICAgEDAwMEAgMAAAAAAAABAhEDIRIEMUETIlFhcYEykaGxFOEF0fD/2gAMAwEAAhEDEQA/AFypLYRoSYlFpQfaEb7yX70RUW2DKkKyjlSVCObXa28JeIZdrPtERtGWToeJL5gVdrAweORtAaGO4ncgovEc0khmiAbSB9lURqt4ORjuJnM4WjJojKBpGT7WjMkdI1ZrSldHrCMmJraDhNPRxMkPA6ZakmilDrDIoMckcHhStByxxZJszasxJCVKLaxYU2xbYvFTVJ6Qwse0bguzASNYRlg+8SXJha2h6jaaxx1EMbNbgqo9YTWdSV1Bg+z3UppEu07JaYyQoqemERrkkhy0Ryp1MY67yHx4+TCZMsJA4xwsNzjpCxHIXXCG+04xNIHtBcvBSq8OcRFGlYFxMI1kln0gOdY5ZN5SQTwpBxRSsJp+2kBbAOBifpGNaMtLuS2mxKWkXSxBfeq0AWiUpD31Oo4lqU+cMpFtC07pro8BWtajRSG0zhKkZqtC++b6CS7KS3m8XOwWpV1SSaTFKYnJ61inTKHBjTKJpM1XvEDnFMMyjHSMrdjK02VaSUichS6swb0hMN8kLSygWvjDyg4rljfUd7VwDHFhEpcxKpizcJ8+sJhttpa/o0m2aruwoByCamG2zbVcWtVxaENUqc11DwLapHdzFhIZFLgNXeN2m1TEJKFqCnAroTVoXNN2nsKOgCdsmal7QqamahZJCwcMaEZf0iuTJN5ZKQSVHOLFtK1PYZgScJgNNXDxUZVvUMVR6OGPJcu30KIe4fyrAGDkPnGQm78H2hGRT7P/ACG0i5I7JTCHTdL6LEC2vs6uX40kPhUfWL/KsUspDpGAwDfCK72llXFBAdQIdiXbk8OmqVmwfJ0VSZssZvHKdmJ1MNUgjCnWnlBlnspWCaUhPKQ3hERfs8axn6hDlMsGJe6HCM9Q70yuKsRGZiBVlOpi/WTsuVAKmquJOCWdZ6ez18oltNjkyhuSkk+9M3z5Hd9IO2lbFScUIOzfZOXaZC5kyYpCkqYEAEMADUHHHWF9v7Fz0OZTLA91kq6pJ+BMXTYtvMxMyU4CmBSAAndFCwHMQ0kJKacKDrSPPydZKMq8HJJqzyRSZkqkyWtLYkpI+UbTMCsI9h7y62OnM5wHbLLImE95Ilqrjduqb+NLF43/ACcb76Gxm0eWiXHCwIv9r7Fy5m9ZphSWe4veTyChUdQYplqsypayhQqCRqHGLHOGUntMOM0wBd5mSopiG9OGClQwWkEBhEfdthGcUjHjiwaXtKejBb8xBKO0cxPiQ/Ixi0A4iIV2YM8DUfKFywph0vtYnNCh0jE9rJZ1HMGFK7ONIgXYxlHenjfexTwosatvhnvprxiWTtYqwWDyipLsgzAjEykjCnKkC8EWtNg+kPtu7SWZakpXo9cs4qiZqyXeDTMIwrziE2ok4DyijFHiqqyTNBxDdm2pSVAvFltm0Vbixin1BxBiny5g6w7sk0TEhL10ibqMStSomT3ofJmS7SqWpmUHvJOnzjntPs1IlpmIN1ixajgwulWcpN4FiILtFsvoCJpdIqCCxfiM4jSlGacXr4HwknplXXKSVBRJIGI1h1KsC5aQtaNz2N4Y5UEcJkSsQCpquaJHPWDNpTyUIN4VemmGkWym2gpaVnEi1FKryi7DnyiBdpVMJLl/SA7RMLNrEX64pKSgHdJcjUwEMfkyCsO/Vz3EyWJgJUoF8n0iqzpCgSDiIaTLUQi6l6lz0iCXKvHGK8bcU2yrHGXwLu6MZD4WA6Rkb/kIf6bPbEyiyRwisbfkFU1azgkJT5xaRNFGIwhBtJYKJuqlpY8AIsytUDj7iJEi8WFSASeQxMFWVZEpVMRTrSO9l7iLQtv8sIB/jV/SC5aAmQ2ailPlvK9GhUVSv6DW90LJ0tpYJFQPif7Q87M2ABJtCwCxuywahxirplxhXtFY8AqaFXDMCLDYl/8AwZRT7ClJVzKia+Y84DHTmzctqCN263JQCtaqZkmKztvaK1N3bENvVF5INbxegDPAW1Jv6zP7srCUpWLqcLysg7s78I6s9mly2IC1zmImIUVICg26U4VAAqSeVYLLPuhMYWd7EkJlzBaJpIXvCWoK3QA168zviGBZwDwi22PaMuYHQtN+9VJIqcrr4hzhFDtdoV3hvrCgCwC0h0jJwmpaIBIUkbiiGVzSHwcjCuB4x5mVKdGScoSpo9LILuSx44xDdMVLZm1rZMmXELoGvFSQtIypmS9AHrpjGtu9pJ8uYZaJqWADlISCDmCQMuGsS/4zk6sJZV8Fst20E2SWqYo76hdQh61zbSKds/aSJktUifLCkrWVX/bQs0vAx3Zti2i0pDyZhUQ5mLIu8GK28hDXZnYKf/mzJaaezeUX1ag9THrdP03CKFyk27KTa1zJExUuYHumigKFJwPUQVZ7VKXjHplq7FyJpQZi1kpSE7t1Ltq4J9YyT2G2eguZN46rWs+l5vSKJY/wNWX5PPQZdxVKtSAFIEewJ2VY0eGzyvyJV8QY7JlgbstADe6kU8onyOEe7/YZHK/CPGe7egryEcLlAYiPZQ6fCyf4QE+ZxMCWixSlqvTJUtZIqVoCiRzIiZ5oX5C5X4PG1oJiI2cZisewK7O2NYYyEpJDOkqT8DCa2dhJbnupq0HRaQsejH4wanFq0zLT7nmU2znKF02zl49FtPYa2I3kJRMGqFD/AGrunyeEVrsC5ZafKWg/iQUv5ivSHR5LYucIT0VUKIoRDDZtoCVBUMJ9gTiK8REMnZ5vcM46clKOySfSJbsYL2mFlKEC85rwHGANsTUGa0lIBZlHIa9Yi2jtNEsXJbP7RH3jAEu07jpDgu/N4HHh4q0hTjxWgtILFJmODkflBVjQlIPHrC2SL2A+sM7NLZvnGZHqmw/Vi1xktfQ1NWchAncFSnMWaz2QKAIAg+Rs5ByDxkLqkW44QUVx7FZkbPJwBhrI2OSPDFhs1k0EN7HYCYcsbYfKKKqnYx1jIvydm8I1BegzPUR57L2gp3IoBQAtGC3rLDBNSc+UDia6fCRxZokQOnrEjnXdlih8B1mtyim5dJClAlhphDpaHQDMNxCXLCqyTwwTzPkYQyZpGFIKnWsLIQaA0LaPxpUmH45627AyQ3aVGlTQrwpuh/PmTjDbYe1kylGXMDyl0X+E5K+v9ITSZTJxB3jUFxSmMaUC5bGOtxdoBpSVMYbX7OLlzL5BmSVKvpmAghHhZwGOuoNIIsE1ZYlEtSEuirqVvBheUoPUkkRL2d28uT+6mJKpR63HxYZp4RYZ+w7NMuzJYuVKgZbBJJxcdOEMnD1Yvi6YqEljl7laPO+0thC5iO7TiQhQbMeHdHI4w8tGxAmT3IO+ohSlNhdfxFPhSwAoPMxY5HZ+5MQsrvBJUqr3iSGSxJowz4RFtBaSe7SGQkupszkCcSTx04R58seSEUpad6XyNz58bdx22qBdk7JQmXcF4JrUFlEmhUTqcOAoM3dbK2VJk1lykJV7zOr8xr6xBJWlKbyyEjjSOE7YVMpZ5ZX+M7sv8xx5CsW41DFV7f7nnuuw/vRGu0gQps5mYzFhStE0QnlRzzPlEyuMJyda3qKobDH5ZIu2E0w++NIhXMJw3icnPyBiRMsFJADcgHHGtNMXjSgUi6Q495KcSeAJIPn0ieXOStuxipESJiswByL6BiCAYn7s6MOIBrxpQHCIwpKsCCxyqBXNolAVQUJbBuBLKOY+kLit7+hrIe4WPCymHhU46JWxveh4mNqS2TajMP1r/WOpswANSg1AuYCmv1EcqUmoFWCS4cFjgSMP7cY2aicrIlmMSvI/WI7VNSg7ywkklrygCehNYH/WgfeOLMhWurARM5uLD0xnIm3TunmH+UM0zELF2hBxSQ4yxB5xXUWrVCv5fg8SypzKoWLGocaetTFuDq+GvHwLnjszanZixLqZYlqOBlm4fyjdPURSe0HYicUH9TmoXi6V/u1nglXhJ5lMXopNavz+sdhJpSNl1knK+Ko70k1TZ88W3Yk+Uvu5staF+6tLPxBwUOIcRNY7IUpIIj6EnWJM1NyYlK0n2VBwONcDxFYpnaT9H01IMyyELaplKLK/0LNFclNzOEXwlLLHs0JnjjVNnnMiWxHOHdis98UBKk0UAKt73GEEy23FqTMSUrSWUhQKVJIyINQYsPZzakvvULSoO5SpLhykjHi0K9OSl7uxHPFKP2GiEBADKDHBQwP0MTombwIIbOsE7dsPcpM1A3FFlaAnUaK1yMef2vaS0TFIS7O4Z8DVoa4U6RT0uSk4s9SkW2SgOVAxFbO1kuWNwPHm1ml2iYd0EA6xYtndmFqrNVGubWipQTGCu20zX0jIOl7AQAMIyFc38sZwX0Kp+sJfdBbix+ETpXnCtZ3jBklYAIUMQGJLNWp40jz5Qs9Hl4DBOIEQSlneOgf76keUSWgS1SgpKnW7N8aacYEM7u5a1rFEhyNTkPMw3EpL2gZKq2O7KSEJDYAfUxOheoilJ7ZN/kn80cHtmcpP80X+lIgeWJflTRoYtvZ2wrlp7xZUm8KI/wCShroIqv6OJC7Wk2uai7LSppYJe+oGqm91JpxL+6X9DVUwUYOO2JyZE1SB7dOLUxP9z6RWrRaATdQxIqSTdSPxLVlyhpt21FCFBAKlqBSGDsMz98IrqNkiWnvLSS2KZb1UdVN8BXU5Hy82Vzyd+38IUourGMnuSO8mKM5vaO7KBGSQfHzZQplEFv7Ski7LZIwpj0hbbjNmbygEIGAJCABkAMfIQCJikeFcvklJV63X9YnlmlJUtL6eSjHgflHoFiBXLSVMklAKg5oWw8+AiXOlKZU0NXMA7H2h3ksEhiaEOQHGPEZ4wTa7QBxdVWPQD09YZceNhcXyoxVpKd0H4UrlocKRGm18E6vxZsMBSkLrfaNMP7QD+sMaMeJpwyERy6iUXSY6OJNWP3QWCgKVJNTr0dvWMVLluAJYfIMASC1VZjhCNM80rjpQeflpD6wqAASQGf44k6w3Dl5Pi6+4E4cdkiZQahCcWKaJ0q2J+EQoG8VM2/dCxgboY4fivDpE9oWyVLusAm8SCLzY9MDhAdnUUAAioYE0qcwRm5zh2VKIuNsmVLSCVABJLuQGvYYt0gVCw7Z1LciAW84IXNDO328AzZgBOhwcEMcDXk0RZZLwMSJ1rdxn946dYjWtQyB+mddOkblEEMCKjIj+8aSoeAsDgBgDnunzpiBHY7Zz0FyZ264qfiQ/x+kSictnASfQ/ME+UBSCxoXguXMqEkgOSAeLOzcnI5HrXjk3ryC6OJNpUkkh3zcGnnTypDCRtQ+0H+MB98jeGN0tz3Uq/wCUDiaH8PyhuNdVB3B6+uzHwkto67S9k7JtFLrAE0BkzUjfGgUPbTwPFiI8stfYhdnmXFoYiqVpNFD3kn7Ij17ZaFLVeAZI9oOK6DWGu0LCicgoWKZHMHIg6x7GN5JxuSp/TsyaXGMq7o8zlT56rMqzzAFpLAKNFMC7E54QMdlWdcy+mWwAAY1wFYX9obbbLFPVKmSgsYoWm9dWjIjQ5FOR1DEq/wDqu0UaQB+YwLjK9mxjFS5IvkmzykCgAbhEhmSxV2ig/wDU1qP+Q/8ApVHP7dtagR+rOP4VRnBjuSL93ss4LH5oyPPE7RnD/sfRcajPTR3Nm7xvOKGOiCcS541jq5WJAOGceY5nq1RktFYYTJd1ATdCnqQrh/V4is0t1CJbQkqVjTCCxvyKyb0Bq4y0Diwg7Z2zO+nJlJSjeUxUA7JxUrDIAmBVo4xcP0cWAAzZ5yAQnrvL9AjzMW43ykkS5ajFsusqSiWhMuWLqEAJSBkBG5i7qFKOQJjoB4E24v8AcLQCL6xdSHYkmgaH53UH9iCO2K9gTu/C5qkFKEqISSfEz1A0Au9X0ir7b2z3k0qQTdBYENhmRz1i37dliTZU2eX7QEsNQ1BvK5mvUwnsPZyShIBlhR/ECryfCPHyqGN+nW+7+pdha/W/wV2XaZeK0lR/Et/lHKtvy5dDIN3VKgfMNFyGx5bPcS2TpSAPMRigEUExAagG6wDMBQUDQr0k9uLr7j/Wj8Fd2f2klzKIDeeXQa4Q0Rb3GOPCJrQVLF28lQwZBA6M9ITLs8xJ/dy16CqdWZyeMSZI+6o2vuEuMl8Eu0bTxyxEKjaSku8Emxz1KAEpZUa0Div4hujqYDs0tc2YZKU74JChQ3bpuqJyxGMHDC6toNOKXcsFkAmXCmr/ACxh+iUQKAvph5kxHsrY/cy0hDElypSgS54MaD74wyRIUjxTKcLoJ9H+UW9P0fHbIcuVN6BJtjmFIDJN5QdnoxvOS1ButjmMYgnLuglabyAWxY0xIcfSDZirpa+rHJTf26QPMCSQXJbAklRGrP8AdIbmhGtdwIN+QVExKw6VU9c+hiFUvOvT5jKJZ0oHV9RT4RGmYoEiYHyvfUdMtcBjHkzhb2UJ0QmUM6AnIkDPED5xMqzpIukXkkYElQ4+KJN0lhkkFuBwPLGNJlqTXJnPDCvL+8HGDTSSAdMHuqRSpTl7w6+11rxOESzUfuwVKJ3kkGgz4ARPaHDMN40AOpq54ABRI0SYDtiAiSs3lEm66iallgUHhSOAAFYc4uKs6NNpHcmXVVGBLiv4UjzoYmuAUA51b4wHZrRMupupSaObxKeVAkg/1idHeZhA6ktwOEAs+RK7Ybgl4Htk2oEgJKWApThz+MHJ2ig5kdPpFZuHQPyb5xLJp84uw/8AJZFp7J5YIvY92rYUz5d2j4pUzscjy1jz2dIWhRSoAKSWIbOL9YbW26o0yOkJe2VjULs5DV3V/wDE/Lyj0nOOWHOPfyBjuEuLK8hFKtHQQRhEElasymJDMbSJ7ZXSO97hGRF+snUecZHWdRVES3UILs1jKiABk/0hnL2aQXJDXfUj5QWpcuUL6lhNABqWyAziNY5N7K5TXggXZUSpapissBqfCB84ry5/KCbdPXOU4F1CTugmp4njGpdnpVvMRTGCQnkwErUc38o9Q7CyrtiQc1rWo9FXPggR5+EDh6fWPSuyIexy2yKx/Oo/OKsC934JOoft/I2KoXqKFT0rUBu0BOTE1HH6wwaE215/drTeG4tkvorAPzoIDq+XFSj4d0IxpN0ze2ZomT0MXCUFT8y3/GF22dvJsyLxTeOQduTnL1JjmbMTLO4FKWXupB6OSaAPrhG7PYEvfmMpYq7OE4+EE4tmanhgPJhlcpvI+78FixqMVfYVybdapyby5Zlu7PQkapCmphvFhUVrBknZ0wsTd13gpddMUJHK6vnDTZ9mvgrUanAY0BLUf154PWVZlp8Sg+iWPrhDZSzS3FaYLa7AUvZsw/8AcKSNEpkgAZMO7gmcEywCpYcNzJFMs+kLbf2gRLDJTe4qP0YRW7P2hnzZjS2BNEIQAnHNRFQkeInQAZwqXTtq5dwlFl1Ra1Xk3Um4Xck3XxemNG+WsFbI2ZLlX1oSxmLK1ZklVSB0wHHnAWxNlGUkFary1VWsgtSrJc0T8ceAMtG0QkXWANWN58TVoqwwUFcnoVN26iHT5zgsq67XQeGMBWqdQDMZ/fWFy7WCRvFxrrEUy1sWJf1jJ9QnZkcdBc2aVGv20av0b1gBdqul31A4vl9Y4M5ZFKRNLIrY1RC5tsQhwVDVsSPLCOkKUsMEsFYXqnHID5+UBCzpcPjkPm2D8YYJUE4RnFPbMo5s6AiYkmqVy1pej30m8KZe0aetYaTdqXEJch0sF0HhYi8+RFFHgkwitBN5JSQClQNcGqlY/KpTcWge02sCr0EHHqvTXt+xno8mFWmc0xAcUBJD4eEcmAKgNARAVstveKEtIUSS67uWYBIpV31ZoXonqmLSJZYEVWTQBw7HM7sOJVnloF3vMqklnfmzwiXKV2OhUSeXMUlIaWpVMloB0wLRHP2wlH+JLmJrjcceYJpEybM7EKJw8Jd9aiNLlqymKH8wxwYgv5DnAY5U6lHR1ryRjtBZmcqIbgPrWJrPtqzzKpUoh2e6Wfh96QstewJcyqkJCveR+7PUB0nqI4RsiYlBTLAUyQEOQkioxGBpeqCHOVYuhLC/0rf1BqP1LPLmJPhUCMQQftoNmJ7yUuVju054j1Aio7JsMxKt4m89Xx5NlF32dZ7tTicYq6SMuT1SJ8/FdnZ5uJoyjS1aesRWpKkzFgNRagKtgoj3YxK1HT83/wCYNooTOGV749IyJ7w4fnH0jIGgrAF2qZjeTT3TXzUYHKkk3lJBOqnJ83MRFZPtFv4D9I13o94n/T/SNSNZKqfLGQ9Y2LQk4Jfk/wBIGNoHvrP5jGxaE4MfIwVAWEFaNCOoi/8AYK0JVZ1oHsLOOigD8QY86cYsfvnFg7D7TTKtPdq3UzRd4XvY+Y6iG4mlIVmVxPRzAm0LOlctSVhwRWDVJaBrc/dqZ3bLNsodkT4uu5JHuiuy7MmWGDk5kuScMScokUWHE4fekRybUJqbyXDFiDQpIxCvOK72l253AN0hzQdKqZ9SQP7R85CMnk4vuz0lHkhtaNqpQkSwcBVs/oIrO09v3QSlWVBg/PhEFi2PbbUp1fuUHMglZGgQ95ubdYtVg7IWaWQqYL6hgV1AbHcon0MejyjBKPf7f9ne2L2U/ZVhn22gRcQcZhe6RomrrPAcaiL7s/Y0mwyjdSVLINVHeUs0SD7odhTDnDBdsQgBMsN8Q2AphhCDaFtUtYribyqvQFx/NdPSJ8vVR7Lf9APlL6IdW3aTJu390BnGfAvlFetdsJIIoQ11s8vWArVamoTT0gJG0UA41fz6RM5ZMm2MWOMVoeSZ7YipyjU0kVeuQhKnbCXIY+WcSq2slg7txFYH05rwzaG8pTgFTOwbhwiTvmDcfOER2vLALBR+XmYHXtp/Ckn74RqhkfZHcV5ZbE2hOPxiKZtECr4YvFOVabbMP7qTTB1ABzwClCCNmbCtC137UogD2SQR+VNPOCliaVzml9F3NUYjO07XBqhCph0Qkqbmrwp6mBTLmzA65Sy2CBupHNSvEeXrFms5kywEhLNmpgB+ZvIPBSLVKXQEYjEEB+ZxgL4K1H8s7k14KwFz5QviSDTB0m5TTVsTwxhUvtFPTMJJVLPu1SS/4WYjSnKL5Ps4NRRTYsSCNCMx6wunWKVMT3cxAScAHepruKzGd1geDYsxdXT9y/YFPexZs/tQo/4iUq4lAB8xWH9l27IWQFJKSaOlV74mkUfaGyJ1nXeF5cpR8SahI/GCHTTN2plhEsshJpQ6Y4ceYj0koTXJU0Y4RZ6WmQLt9JvJ1H0jgjSKfsbbkxCzuLCSd7dN0vhXB6xbbPaAFAZKDpOLA5dITk6eK2tfIlqSewuzEXg44PDpIaEU+1Mrc8+ME7UtRl2VSyd4pujW8qg8nfpF3Sy4xabuifJG2vqedWmcFLUp11UTQHMk6cYh78jBS/yH5CJCzY+g+kafl5CFFhrvT7y/yRkTXxw/KIyMOE4Q2vmIhUh8z5pgtai0DLUwOsMSBbByGwUfMRt+fPGJEcR1joFszBUDYHNQrEP98ogCFuCMQXBBIIIqCIZrVweB0pJJr6x3E7keudldsi1yAVEd6hkzBqclgaKFebjKGyhHjWx9rLsk0TUVyWn30nEH5HWPXtn2+XaJaZstTpUOoOYIyIimMuSJJx4vQk2nY7sy9LISVhlhsWe6eYJ+MB2fYUtK0zZgBUPCpWIepIcUJbHGDtuWtUpe6kFSqpUrAZEfD0hDPthJcnKo0bSPE6iSWRtLfYvxRk46ZZplrloTuteyYOTzJy84XzbS4qXfSECLYgF1H+0CdotsiVJvJIvqICE0c6qbQBzEjllyyUEq/o1wUNsYbQ2smXuu6iKAM588OZpCK2WifMuhDIKwXYX1DeUAHZsA9AfEK0hTsqaZiiq6ok4njqYtdhtEuWUEoqkHC8MaPed8sjnlFCwLF3/f/Rimn22LNndlps0lS1KU2qiB00FIeSuzSEMlaaqB9quGIf5u9YNG1VhwiZQl7qk308auFfzGIk7QIcmWC7C8lRppuqFGrmYyc4yX6n/X8G+74KX2n2HaLOu+hXeyyQHogoc4LRkH9oBsHajmbKl3QFKloXy3vofSLSu2A+J1Au5ZsRhlQwjttilpLHdlrUACnInIvRJpQuAaDdPifi6mOT2tf7NcZLbLBYLVLbfkrRxKDdHkA3rDC4hQBAATlgX+UVSz2KZKqld5ALXg/S8MiMK5kw12daWdJG6cvdVw4U6Qc8EWtIB/I1SLqiEy0mmLkFgHPsmnWO2K8WHLHzOPlC2baCDidOn2IklWji0ePknUnGSGKGrs52ps4qTu4irYv54QisUyaiqZZe8oEUFBdGCqGr1rhFpl2ji8V7tBshUwd5LUoTEu4Qpr6aslsHGVPjFfS5kqjJ6f8G7egqRtdyElBSohwKKBH4S5APU9MYbpQFhlAFJyIfLMffOKNsqd3ssn3VFwMsG6uDFhsm0lSwAsFSdcwI3qMMeWlT/hhONrQ5TZlJok3hhdWSacF1I63or+2Nkre9KCkG8CUXAsH+EpBxJwV6YG1SpgUAUl3GUbUtvrAwbxvQlNp6KTYlTVEXiotkaAHgnLPLPytllKihKQlyM+GghxZrFLUHoSalq1g+VZ0pwEezjwOStsRl6hPSQtsWzyVXl4aQj7X2++sSkndRVXFRHyHxMO+0e2BZpbJYzVDdFKZXiNB6nrHnQWsmuJck5nV6wc1GEeMfyDjTk+T/BO50EdCWOAiFCjmPvziVKgM2hBRZ1c4jzjI3fGqYyOo62K2GhgS0YR33nnEai/WGpC2we8cjSMu/ijpckjCojhGOLQdGWamJIz6uxjchObk8yI2vnEZWcKCOow1OXWnyhn2c29Msky8mqFeNDgBXHgrj5wsGFY1fbSN2uxmn3PY5cyRb5Ly1f+yFNgR9v6xUNv7HnyApTpUnIh3PSKjYdqTJCxMkrKFDHQjRQzEei7F7ZyLUBKtATLmGlTuKP4VHPga84DJghl21s6E5Y/09jze2InLliYKbzMMWwfzpSFQsBKrywon3iXPV8Y9N7W2FMpSbqRcWk0ycHeBywI9YqUm2JSq5NBu5TMWBYMvg/t8Q+aomxNqTh2ony5nKWwnYNl3dxXPD4GohxarN+7rr5H7+MJV2Uo3kFiCcDliOmHODJW1n3JmNN7I89IptNcZCVNoGTaigsTyP1MMZVofjCm3orHFnXNSAQARy+ceZ1HSb9pf0/U3qXcfExMgpUChabyVAgjJjQ4YQrl7YIa/KIbSsH2fakpdCoB9d34xE+nnEsU4sEtcxVnKU3VLQrwrdydQphQt5gc2N2Opa1Xu7UEs29mcD98+jeShK0XaEGKxa5s6XMUh1LSlRA31CmWsW9Pnk401tAS49iwz6lqYZcoFf7yhVJ2yR4pahxe98awVJ2pLXSo5gj4xN1EHJ8mjYutIOTPr91gizlRU484gkoCsIYolXRrEaxTcqignNJFO7R2IS54UhTFZqAcFUcnQF3fUHWDdnTkd2lIJJxVeBBHnDz/AKflzllczxGmOAyEM5HZKUKur8xj38eGcoxT3Ql54pUwCwzGSlDscehH1HxhpKlhZCU11MF2bs/KluUhicTiTzJhlIsyJYpTUxuPoW5uUhE86f6TLJZQgUxgHbm3JdmTXeWfCh68zon4wl7QdtEoBl2ZlrzX7Cf4ffPpzwigm1KWtS1qUVKLkqLknof7RdKSiqiJhBydyGVqtK5i1LWb5UXLt0AqwAyjlKsGpwLfEQEJh0zgmWp9eFH+AiZplSoKRj/WJR084BKm9qvIlumMaM0+96H0gaCsY3uB8oyAf1se9/u/9YyO4s7kV425B9qOP15GsakbPSR4H4ur5eUdmwS38PmpXzivjEm5SIv2gj3j6xhtqDn8YydY0XgGA6/N4lFil4MD1P8A7R1ROtkJtadY0Z4yPqPrE/6nLwCQ3+r6xCJCCtgzChAf6dI2kZbIzaBrHKrQNfKsEGzSzl6joco0qyoZ7rfD/dHaO2CqnVz9frHBncFH74mJ5dmSzkY4OSMekdLsydA/An+kbSMtk8jb00ITKWVKlgggK3ijLcU7gNlUcIcWSUlS0mhCmGorgYrs6zpCXAz4j5mGGz59xkkhsRXD+kR9Thb90e6FzhydlxHZmUhBEu+lddxCnQsl23FAhLk1u3ecILVs60yx+9s608QkqT5igjq29oJ3eJMpZQEChIBcnEsoENp/WG2z/wBI05BCZstCx7yFEGnAgg+YhixOauTo7gq7FeQp86fD+kXTsPYEzJawtNLwuuOFSOGEFSO2dgm/4ssJOfeSwfUBQ9YsFg23ZFgCVMlsKAIUmnC6k0jYYGpW3YKjxegOf2XlKwDQCvsaj7EWxM5JzEdhY1HnDngg/AxZJIqtm7Pd0XQ4+EM/2bLmDfQH5Q4pGqR0cEFox5JMr03svKOFIiT2TliLNeGojkzEjMRj6fG/BqyT+RTI2MlIZ4JTsxOcR23tDZJX+JaJaDoVpB6B3MV63fpJsSH7u/NI9xBA/Mu6G5PGrFjXgzlJlql2BCcBE61JQCSQkDEksBzMeX2v9I9omOJUpEsaqPeKbVqAHzit2+0zrT/9iYqYNFEXeiKJB6QdxXY7hJ9y+7f/AEn2GzumWo2heksi4Ocw7v5b0ecba7ezbWSJi1Il/wDjQAE/6t519S2gEFSdmywWuI/KPpDNFmlpG7LSwx3delICU0w442irWfa0oYBY6D6wWjbErMr/AC/1h8UINRLSQM2SeRus5HIxz3EvEpSB/Cn0YfGA18B0xUnbEoYLX1T84l/bsohjMUOASfWGwEvKX1uFI+saIlgspKkj3mUQPyjDpGUgtiv9tyR7R53Y2Nuyh7auV0/Qw0EqW7FKDVsEnlmY5m2KQ9ZMs8kfMBozjE3lIVft6Vkr+VX0jIP/AGZI/wDHL8kxkdxidykDyZNBQcK/URooo7cfCmMjIIADQgleI9QdYID1r6l4yMgjCOakBNSGHDLEwNLZyat98eUZGRxxMFgDOsQ2k7qmD0xMZGR3g42mWWFPU8tY2oEn1rWMjI1HMHtLgdRhzESPqfT+sZGRxhoq4P6RCp71QR5EZH76RkZHI5nd4aH76xwQgirdUvGRkaYd2VUxA/drUnS6tSfg0Gp2ra0+G0zeq1K+JjIyMOZ2vtBbx/3Mz+Q/ERg7SW40/WV/yj4CMjI0ygWftm2KobTO6TFJ/wBpEL505a/HMWsfjWpf+4xkZHGkaLGT4QOP28dfq5oMTzaNxkYag2zSCMRdfJwfgIJQAwarFiRRuBz8oyMgPDDQW91q9Gp54mDxMNy9ShalOmBjIyBCNGaCHJNOfwBjicskBlCtPCqub0WB5xkZHHAs2YBkkkU0blumOU2lTC6Q1MW8muV9IyMjQLOz3pLpD8qeW+loitNoKC5IHBQUW/nVWMjI1BM67163gX4Af8I3GRkbSMP/2Q==', 1, 1, 0),
(4, 'Gà', 'con', 0, 'https://bizweb.dktcdn.net/100/365/460/products/ga-ta-nua-con.jpg?v=1571131855420', 1, 0, 0),
(5, 'Hành tươi', 'củ', 0, 'https://cdn.tgdd.vn/Files/2019/12/04/1224675/cach-chon-hanh-la-tuoi-ngon-201912040900503645.jpg', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name`, `desc`) VALUES
(1, 'Gia đình 1', 'Gia đình vui vẻ'),
(2, 'Gia đình 2', 'Gia đình vui vẻ 2'),
(3, 'Gia đình 3', 'Gia đình vui vẻ 3'),
(4, 'Gia đình 4', 'Gia đình vui vẻ 4'),
(5, 'Gia đình 5', 'Vui vẻ 5');

-- --------------------------------------------------------

--
-- Table structure for table `groupmarket`
--

CREATE TABLE `groupmarket` (
  `id` bigint(20) NOT NULL,
  `idGroup` bigint(20) NOT NULL,
  `idMarket` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupmarket`
--

INSERT INTO `groupmarket` (`id`, `idGroup`, `idMarket`) VALUES
(1, 1, 12),
(2, 1, 13),
(3, 1, 14);

-- --------------------------------------------------------

--
-- Table structure for table `market`
--

CREATE TABLE `market` (
  `id` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `dateToBuy` date NOT NULL,
  `dateBought` date DEFAULT NULL,
  `idUserBought` bigint(20) DEFAULT NULL,
  `state` smallint(6) NOT NULL,
  `quantity` int(11) NOT NULL,
  `idFood` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `market`
--

INSERT INTO `market` (`id`, `idUser`, `dateToBuy`, `dateBought`, `idUserBought`, `state`, `quantity`, `idFood`) VALUES
(1, 1, '2023-07-16', '2023-07-16', 1, 1, 3, 2),
(2, 1, '2023-07-14', '2023-07-14', 1, 1, 2, 1),
(3, 1, '2023-07-15', '2023-07-16', 1, 1, 1, 5),
(8, 1, '2023-07-16', '2023-07-16', 1, 1, 5, 1),
(9, 1, '2023-07-16', '2023-07-16', 1, 1, 4, 5),
(10, 1, '2023-07-16', '2023-07-16', 1, 1, 1, 3),
(11, 1, '2023-07-16', '2023-07-16', 1, 1, 3, 5),
(12, 1, '2023-07-16', '2023-07-16', 2, 1, 9, 2),
(13, 1, '2023-07-16', NULL, NULL, 0, 3, 5),
(14, 1, '2023-07-16', NULL, NULL, 0, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `idGroup` bigint(20) NOT NULL,
  `isLeader` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `idUser`, `idGroup`, `isLeader`) VALUES
(1, 1, 1, 1),
(3, 1, 2, 1),
(5, 1, 3, 1),
(7, 1, 4, 1),
(8, 1, 5, 1),
(15, 2, 5, 0),
(16, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `idFood` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `desc`, `idFood`, `idUser`) VALUES
(2, 'Gia truyền', 'CT gia truyền nhà Ngọc', 3, 1),
(4, 'Gia truyền', 'CT gia truyền nhà Ngọc', 3, 1),
(6, 'Gia truyền 3', 'haha', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `recipematerial`
--

CREATE TABLE `recipematerial` (
  `id` bigint(20) NOT NULL,
  `idMaterial` bigint(20) NOT NULL,
  `idRecipe` bigint(20) NOT NULL,
  `quantity` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipematerial`
--

INSERT INTO `recipematerial` (`id`, `idMaterial`, `idRecipe`, `quantity`) VALUES
(3, 4, 2, 1),
(4, 1, 2, 3),
(8, 4, 4, 1),
(9, 1, 4, 3),
(11, 2, 6, 2),
(12, 4, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `idMarket` bigint(20) NOT NULL,
  `expire` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `idUser`, `idMarket`, `expire`, `quantity`, `state`) VALUES
(1, 1, 2, '2023-07-20', 2, 1),
(2, 1, 3, '2023-07-20', 1, 0),
(3, 1, 1, '2023-07-20', 3, 0),
(4, 1, 8, '2023-07-20', 5, 0),
(5, 1, 9, '2023-07-19', 1, 1),
(6, 1, 10, '2023-07-18', 1, 1),
(7, 1, 11, '2023-07-20', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `name`) VALUES
(1, 'q', '1', 1, 'ngocars'),
(2, 'duong', '1234', 0, 'Duong'),
(5, 'thinh', '1234', 0, 'thinh1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cook`
--
ALTER TABLE `cook`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cook_idrecipe_foreign` (`idRecipe`),
  ADD KEY `cook_iduser_foreign` (`idUser`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_iduser_foreign` (`idUser`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupmarket`
--
ALTER TABLE `groupmarket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupmarket_idgroup_foreign` (`idGroup`),
  ADD KEY `groupmarket_idmarket_foreign` (`idMarket`);

--
-- Indexes for table `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`id`),
  ADD KEY `market_iduser_foreign` (`idUser`),
  ADD KEY `market_idfood_foreign` (`idFood`),
  ADD KEY `market_iduserbought_foreign` (`idUserBought`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_idgroup_foreign` (`idGroup`),
  ADD KEY `member_iduser_foreign` (`idUser`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_idfood_foreign` (`idFood`),
  ADD KEY `recipe_iduser_foreign` (`idUser`);

--
-- Indexes for table `recipematerial`
--
ALTER TABLE `recipematerial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipematerial_idrecipe_foreign` (`idRecipe`),
  ADD KEY `recipematerial_idmaterial_foreign` (`idMaterial`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_idmarket_foreign` (`idMarket`),
  ADD KEY `store_iduser_foreign` (`idUser`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cook`
--
ALTER TABLE `cook`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `groupmarket`
--
ALTER TABLE `groupmarket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `market`
--
ALTER TABLE `market`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `recipematerial`
--
ALTER TABLE `recipematerial`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cook`
--
ALTER TABLE `cook`
  ADD CONSTRAINT `cook_idrecipe_foreign` FOREIGN KEY (`idRecipe`) REFERENCES `recipe` (`id`),
  ADD CONSTRAINT `cook_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `groupmarket`
--
ALTER TABLE `groupmarket`
  ADD CONSTRAINT `groupmarket_idgroup_foreign` FOREIGN KEY (`idGroup`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `groupmarket_idmarket_foreign` FOREIGN KEY (`idMarket`) REFERENCES `market` (`id`);

--
-- Constraints for table `market`
--
ALTER TABLE `market`
  ADD CONSTRAINT `market_idfood_foreign` FOREIGN KEY (`idFood`) REFERENCES `food` (`id`),
  ADD CONSTRAINT `market_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `market_iduserbought_foreign` FOREIGN KEY (`idUserBought`) REFERENCES `user` (`id`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_idgroup_foreign` FOREIGN KEY (`idGroup`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `member_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_idfood_foreign` FOREIGN KEY (`idFood`) REFERENCES `food` (`id`),
  ADD CONSTRAINT `recipe_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Constraints for table `recipematerial`
--
ALTER TABLE `recipematerial`
  ADD CONSTRAINT `recipematerial_idmaterial_foreign` FOREIGN KEY (`idMaterial`) REFERENCES `food` (`id`),
  ADD CONSTRAINT `recipematerial_idrecipe_foreign` FOREIGN KEY (`idRecipe`) REFERENCES `recipe` (`id`);

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_idmarket_foreign` FOREIGN KEY (`idMarket`) REFERENCES `market` (`id`),
  ADD CONSTRAINT `store_iduser_foreign` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
