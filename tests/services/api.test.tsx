import { afterEach, describe, expect, it, vi, beforeEach } from "vitest";
import {
  fetchPeople,
  fetchPageData,
  fetchUrl,
  searchPeopleName,
  transformData,
} from "../../src/services/api";
import { swapiBaseUrl } from "../../src/services/config";
import * as mockData from "../mock_data/mockData";

describe("API Services", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  describe("fetchPeople", () => {
    it("Should fetch people data for a given page", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData.mockPeopleApiResult),
      } as Response);

      const result = await fetchPeople(1);

      expect(fetchSpy).toHaveBeenCalledWith(`${swapiBaseUrl}/people/?page=1`, {
        method: "GET",
      });
      expect(result).toEqual(mockData.mockPeopleApiResult);
    });
  });

  describe("fetchUrl", () => {
    it("Should fetch data for the given url", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData.mockPeopleData),
      } as Response);

      const result = await fetchUrl(mockData.mockUrl);

      expect(fetchSpy).toHaveBeenCalledWith(mockData.mockUrl, {
        method: "GET",
      });
      expect(result).toEqual(mockData.mockPeopleData);
    });
  });

  describe("transformData", () => {
    it("should transform people data correctly, including species name", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData.mockSpeciesData),
      } as Response);

      const result = await transformData(mockData.mockPeopleApiResult);

      expect(fetchSpy).toHaveBeenCalledWith(
        mockData.mockPeopleData.species[0],
        {
          method: "GET",
        }
      );

      expect(result.results[0]).toEqual(mockData.mockTransformedPeopleData);
    });
    it('should set species to "unknown" if person has no species', async () => {
      // No fetchUrl call should happen for species
      const result = await transformData(mockData.mockFemalePeopleApiResult);

      expect(fetchSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("/species/"),
        expect.anything()
      );
      expect(result.results[0]).toEqual(
        mockData.mockTransformedFemalePeopleData
      );
      expect(result.results[0].species).toBe("unknown");
    });

    it('should set gender to "unknown" if gender is not male or female', async () => {
      const mockOtherGenderPeopleData = {
        ...mockData.mockPeopleData,
        gender: "n/a", // Example of 'other' gender
        species: [],
      };
      const mockOtherGenderApiResult = {
        count: 1,
        next: "",
        previous: "",
        results: [mockOtherGenderPeopleData],
      };

      const result = await transformData(mockOtherGenderApiResult);

      expect(result.results[0].gender).toBe("unknown");
    });
  });

  describe("searchPeopleName", () => {
    it("should search people by name and return transformed data", async () => {
      fetchSpy
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData.mockPeopleApiResult),
        } as Response) // For the initial search
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData.mockSpeciesData),
        } as Response); // For species data during transform

      const result = await searchPeopleName("Luke");

      expect(fetchSpy).toHaveBeenCalledWith(
        `${swapiBaseUrl}/people/?search=Luke`,
        { method: "GET" }
      );
      expect(fetchSpy).toHaveBeenCalledWith(
        mockData.mockPeopleData.species[0],
        {
          method: "GET",
        }
      );
      expect(result.results[0]).toEqual(mockData.mockTransformedPeopleData);
    });
  });

  describe("fetchPageData", () => {
    it("should fetch page data and return transformed data", async () => {
      fetchSpy
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData.mockPeopleApiResult),
        } as Response) // For fetchPeople call
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData.mockSpeciesData),
        } as Response); // For species data during transform

      const result = await fetchPageData(1);

      expect(fetchSpy).toHaveBeenCalledWith(`${swapiBaseUrl}/people/?page=1`, {
        method: "GET",
      });
      expect(fetchSpy).toHaveBeenCalledWith(
        mockData.mockPeopleData.species[0],
        {
          method: "GET",
        }
      );
      expect(result.results[0]).toEqual(mockData.mockTransformedPeopleData);
    });
  });
});
